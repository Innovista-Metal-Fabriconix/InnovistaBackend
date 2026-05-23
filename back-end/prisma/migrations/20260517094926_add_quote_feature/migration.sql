-- CreateTable
CREATE TABLE "QuoteSubmission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientName" TEXT NOT NULL,
    "contactPerson" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "clientWebsite" TEXT,
    "projectTitle" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "projectReferenceNumber" TEXT,
    "projectDescription" TEXT NOT NULL,
    "installationConditions" TEXT,
    "siteConstraints" TEXT,
    "standards" TEXT,
    "qualityExpectations" TEXT,
    "materialBrand" TEXT,
    "colorCode" TEXT,
    "additionalFeatures" TEXT,
    "interiorStyle" TEXT,
    "paymentConditions" TEXT,
    "budget" TEXT,
    "latestDeliveryDate" TEXT,
    "proposedVisitDates" TEXT,
    "siteAddress" TEXT,
    "googleMapsLink" TEXT,

    CONSTRAINT "QuoteSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteFile" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "driveFileId" TEXT NOT NULL,
    "driveViewUrl" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,

    CONSTRAINT "QuoteFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteOtpSession" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otpHash" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "otpAttempts" INTEGER NOT NULL DEFAULT 0,
    "verifiedAt" TIMESTAMP(3),
    "verificationTokenHash" TEXT,
    "verificationTokenExpiresAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteOtpSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuoteSubmission_email_createdAt_idx" ON "QuoteSubmission"("email", "createdAt");

-- CreateIndex
CREATE INDEX "QuoteFile_submissionId_idx" ON "QuoteFile"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteOtpSession_email_key" ON "QuoteOtpSession"("email");

-- AddForeignKey
ALTER TABLE "QuoteFile" ADD CONSTRAINT "QuoteFile_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "QuoteSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
