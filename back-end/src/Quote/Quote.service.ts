import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createHash, randomBytes, randomInt } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Readable } from 'node:stream';
import { google, drive_v3 } from 'googleapis';
import { EmailDTO, EmailTemplate } from '../Emails/Email.DTO';
import { EmailService } from '../Emails/Email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { QuoteSubmissionPayload } from './Quote.types';

const MAX_TOTAL_BYTES = 30 * 1024 * 1024;
const OTP_LENGTH = 6;

@Injectable()
export class QuoteService {
  private readonly driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID ?? '';
  private readonly otpTtlMinutes = Number(
    process.env.QUOTE_OTP_TTL_MINUTES || 10,
  );
  private readonly dailyLimit = Number(process.env.QUOTE_DAILY_LIMIT || 3);
  private readonly otpMaxAttempts = Number(
    process.env.QUOTE_OTP_MAX_ATTEMPTS || 5,
  );
  private readonly ownerNotificationEmail =
    process.env.QUOTE_NOTIFICATION_TO || process.env.MAIL_FROM || '';

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private hashValue(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private validateEmail(email: string) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  private getStartOfUtcDay(date = new Date()) {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  }

  private getOtpCode() {
    const min = 10 ** (OTP_LENGTH - 1);
    const max = 10 ** OTP_LENGTH;
    return String(randomInt(min, max));
  }

  private getServiceAccountCredentials() {
    const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (rawJson) {
      return JSON.parse(rawJson) as {
        client_email: string;
        private_key: string;
      };
    }

    const filePath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
    if (!filePath) {
      throw new InternalServerErrorException(
        'GOOGLE_SERVICE_ACCOUNT_PATH or GOOGLE_SERVICE_ACCOUNT_JSON must be set.',
      );
    }

    const absolutePath = resolve(filePath);
    return JSON.parse(readFileSync(absolutePath, 'utf8')) as {
      client_email: string;
      private_key: string;
    };
  }

  private getOAuthCredentials() {
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
    const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim();

    if (!clientId || !clientSecret || !refreshToken) {
      return null;
    }

    return {
      clientId,
      clientSecret,
      refreshToken,
    };
  }

  private async getDriveClient() {
    if (!this.driveFolderId) {
      throw new InternalServerErrorException(
        'GOOGLE_DRIVE_FOLDER_ID is not configured.',
      );
    }

    const oauth = this.getOAuthCredentials();

    if (oauth) {
      const auth = new google.auth.OAuth2(oauth.clientId, oauth.clientSecret);
      auth.setCredentials({
        refresh_token: oauth.refreshToken,
      });

      // Force token refresh early to fail fast on invalid OAuth config.
      await auth.getAccessToken();
      return google.drive({ version: 'v3', auth });
    }

    const credentials = this.getServiceAccountCredentials();
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    await auth.authorize();
    return google.drive({ version: 'v3', auth });
  }

  private async createSubmissionFolder(
    drive: drive_v3.Drive,
    folderName: string,
  ) {
    const folder = await drive.files.create({
      supportsAllDrives: true,
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [this.driveFolderId],
      },
      fields: 'id',
    });

    const folderId = folder.data.id;
    if (!folderId) {
      throw new InternalServerErrorException(
        'Failed to create Google Drive subfolder.',
      );
    }

    return folderId;
  }

  private async uploadToDrive(
    drive: drive_v3.Drive,
    file: Express.Multer.File,
    folderId: string,
  ) {
    const upload = await drive.files.create({
      supportsAllDrives: true,
      requestBody: {
        name: file.originalname,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      },
      fields: 'id, webViewLink, webContentLink',
    });

    const fileId = upload.data.id;
    if (!fileId) {
      throw new InternalServerErrorException(
        'Failed to upload file to Google Drive.',
      );
    }

    try {
      await drive.permissions.create({
        fileId,
        supportsAllDrives: true,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    } catch {
      // Some organizations block public link sharing. Keep the file private in that case.
    }

    return {
      driveFileId: fileId,
      driveViewUrl: upload.data.webViewLink || upload.data.webContentLink || '',
    };
  }

  async sendOtp(email: string, clientName: string) {
    const normalizedEmail = this.normalizeEmail(email);
    if (!this.validateEmail(normalizedEmail)) {
      throw new BadRequestException('Invalid email address.');
    }

    const otpCode = this.getOtpCode();
    const otpHash = this.hashValue(otpCode);
    const expiresAt = new Date(Date.now() + this.otpTtlMinutes * 60 * 1000);

    await this.prisma.quoteOtpSession.upsert({
      where: { email: normalizedEmail },
      update: {
        otpHash,
        otpExpiresAt: expiresAt,
        otpAttempts: 0,
        verifiedAt: null,
        verificationTokenHash: null,
        verificationTokenExpiresAt: null,
      },
      create: {
        email: normalizedEmail,
        otpHash,
        otpExpiresAt: expiresAt,
        otpAttempts: 0,
      },
    });

    const dto: EmailDTO = {
      to: normalizedEmail,
      template: EmailTemplate.QUOTE_OTP,
      context: {
        name: clientName?.trim() || '',
        otpCode,
      },
    };

    await this.emailService.sendEmail(dto);

    return { message: 'OTP sent successfully.' };
  }

  async verifyOtp(email: string, otp: string) {
    const normalizedEmail = this.normalizeEmail(email);
    const session = await this.prisma.quoteOtpSession.findUnique({
      where: { email: normalizedEmail },
    });

    if (!session || !session.otpHash || !session.otpExpiresAt) {
      throw new BadRequestException(
        'OTP not found. Please request a new code.',
      );
    }

    if (session.otpAttempts >= this.otpMaxAttempts) {
      throw new BadRequestException(
        'Too many invalid attempts. Request a new OTP.',
      );
    }

    if (session.otpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException('OTP expired. Please request a new code.');
    }

    const otpHash = this.hashValue(otp.trim());
    if (otpHash !== session.otpHash) {
      await this.prisma.quoteOtpSession.update({
        where: { email: normalizedEmail },
        data: { otpAttempts: { increment: 1 } },
      });
      throw new BadRequestException('Invalid OTP code.');
    }

    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenHash = this.hashValue(verificationToken);
    const verificationTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await this.prisma.quoteOtpSession.update({
      where: { email: normalizedEmail },
      data: {
        verifiedAt: new Date(),
        verificationTokenHash,
        verificationTokenExpiresAt,
        otpHash: null,
        otpExpiresAt: null,
        otpAttempts: 0,
      },
    });

    return { verificationToken };
  }

  private validateFileSet(files: Express.Multer.File[]) {
    if (files.length > 3) {
      throw new BadRequestException('Maximum 3 files are allowed.');
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      throw new BadRequestException(
        'Total attachment size cannot exceed 30MB.',
      );
    }
  }

  private getGoogleDriveErrorMessage(error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('Service Accounts do not have storage quota')) {
      return (
        'Google Drive upload failed in service-account mode. ' +
        'Use a Google Workspace Shared Drive, or switch to free OAuth mode by setting GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, and GOOGLE_OAUTH_REFRESH_TOKEN.'
      );
    }

    if (
      message.includes('invalid_grant') ||
      message.includes('invalid_client') ||
      message.includes('unauthorized_client')
    ) {
      return 'Google Drive OAuth credentials are invalid. Recreate the refresh token and verify GOOGLE_OAUTH_CLIENT_ID/GOOGLE_OAUTH_CLIENT_SECRET/GOOGLE_OAUTH_REFRESH_TOKEN.';
    }

    return 'Failed to upload files to Google Drive.';
  }

  async submitQuote(
    payload: QuoteSubmissionPayload,
    files: Express.Multer.File[],
  ) {
    const normalizedEmail = this.normalizeEmail(payload.email || '');
    if (!this.validateEmail(normalizedEmail)) {
      throw new BadRequestException('Invalid email address.');
    }

    if (
      !payload.clientName?.trim() ||
      !payload.phone?.trim() ||
      !payload.projectTitle?.trim()
    ) {
      throw new BadRequestException(
        'Missing required fields in quote submission.',
      );
    }

    if (
      !payload.projectDescription?.trim() ||
      payload.projectDescription.trim().length < 20
    ) {
      throw new BadRequestException(
        'Project description should be at least 20 characters.',
      );
    }

    if (payload.honeypot?.trim()) {
      throw new BadRequestException('Spam detected.');
    }

    const elapsed = Number(payload.elapsedMs || 0);
    if (!Number.isNaN(elapsed) && elapsed > 0 && elapsed < 2000) {
      throw new BadRequestException('Submission rejected. Please try again.');
    }

    this.validateFileSet(files);

    const session = await this.prisma.quoteOtpSession.findUnique({
      where: { email: normalizedEmail },
    });

    if (
      !session ||
      !session.verificationTokenHash ||
      !session.verificationTokenExpiresAt
    ) {
      throw new BadRequestException(
        'Email verification is required before submission.',
      );
    }

    if (session.verificationTokenExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException(
        'Email verification expired. Please verify again.',
      );
    }

    const incomingTokenHash = this.hashValue(
      payload.emailVerificationToken || '',
    );
    if (incomingTokenHash !== session.verificationTokenHash) {
      throw new BadRequestException('Invalid email verification token.');
    }

    const todayStart = this.getStartOfUtcDay();
    const todayCount = await this.prisma.quoteSubmission.count({
      where: {
        email: normalizedEmail,
        createdAt: {
          gte: todayStart,
        },
      },
    });

    if (todayCount >= this.dailyLimit) {
      throw new BadRequestException(
        `Daily submission limit reached for this email (${this.dailyLimit}).`,
      );
    }

    const drive = files.length > 0 ? await this.getDriveClient() : null;
    const submissionFolderName = `Quote-${new Date().toISOString().replace(/[:.]/g, '-')}-${normalizedEmail}`;
    let submissionFolderId: string | null = null;

    const uploadedFiles: Array<{
      originalName: string;
      mimeType: string;
      sizeBytes: number;
      driveFileId: string;
      driveViewUrl: string;
    }> = [];

    if (drive) {
      try {
        submissionFolderId = await this.createSubmissionFolder(
          drive,
          submissionFolderName,
        );

        for (const file of files) {
          const uploaded = await this.uploadToDrive(
            drive,
            file,
            submissionFolderId,
          );
          uploadedFiles.push({
            originalName: file.originalname,
            mimeType: file.mimetype,
            sizeBytes: file.size,
            driveFileId: uploaded.driveFileId,
            driveViewUrl: uploaded.driveViewUrl,
          });
        }
      } catch (error) {
        throw new BadRequestException(this.getGoogleDriveErrorMessage(error));
      }
    }

    const submission = await this.prisma.quoteSubmission.create({
      data: {
        clientName: payload.clientName.trim(),
        contactPerson: payload.contactPerson?.trim() || null,
        email: normalizedEmail,
        phone: payload.phone.trim(),
        clientWebsite: payload.clientWebsite?.trim() || null,
        projectTitle: payload.projectTitle.trim(),
        location: payload.location?.trim() || '',
        projectType: payload.projectType?.trim() || 'Other',
        projectReferenceNumber: payload.projectReferenceNumber?.trim() || null,
        projectDescription: payload.projectDescription.trim(),
        installationConditions: payload.installationConditions?.trim() || null,
        siteConstraints: payload.siteConstraints?.trim() || null,
        standards: payload.standards?.trim() || null,
        qualityExpectations: payload.qualityExpectations?.trim() || null,
        materialBrand: payload.materialBrand?.trim() || null,
        colorCode: payload.colorCode?.trim() || null,
        additionalFeatures: payload.additionalFeatures?.trim() || null,
        interiorStyle: payload.interiorStyle?.trim() || null,
        paymentConditions: payload.paymentConditions?.trim() || null,
        budget: payload.budget?.trim() || null,
        latestDeliveryDate: payload.latestDeliveryDate?.trim() || null,
        proposedVisitDates: payload.proposedVisitDates?.trim() || null,
        siteAddress: payload.siteAddress?.trim() || null,
        googleMapsLink: payload.googleMapsLink?.trim() || null,
        files: {
          create: uploadedFiles,
        },
      },
      include: {
        files: true,
      },
    });

    await this.prisma.quoteOtpSession.update({
      where: { email: normalizedEmail },
      data: {
        verificationTokenHash: null,
        verificationTokenExpiresAt: null,
      },
    });

    if (this.ownerNotificationEmail) {
      const fileLinks = submission.files
        .map((file) => file.driveViewUrl)
        .filter(Boolean);
      const dto: EmailDTO = {
        to: this.ownerNotificationEmail,
        template: EmailTemplate.QUOTE_NOTIFICATION,
        context: {
          name: payload.clientName,
          quoteId: submission.id,
          email: normalizedEmail,
          phone: payload.phone,
          projectTitle: payload.projectTitle,
          fileLinks,
        },
      };
      await this.emailService.sendEmail(dto);
    }

    return {
      message: 'Quote submitted successfully.',
      submissionId: submission.id,
    };
  }

  async getAdminSubmissions(page: number, limit: number) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100);
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.quoteSubmission.findMany({
        skip,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          files: true,
        },
      }),
      this.prisma.quoteSubmission.count(),
    ]);

    return {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      data: items,
    };
  }

  async getAdminSubmissionById(id: string) {
    const submission = await this.prisma.quoteSubmission.findUnique({
      where: { id },
      include: {
        files: true,
      },
    });

    if (!submission) {
      throw new BadRequestException('Quote submission not found.');
    }

    return submission;
  }
}
