"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const Email_service_1 = require("../Emails/Email.service");
const Email_DTO_1 = require("../Emails/Email.DTO");
const Authentication_TokenCreate_1 = require("./Authentication.TokenCreate");
let AuthenticationService = class AuthenticationService {
    prisma;
    emailService;
    tokenCreate;
    constructor(prisma, emailService, tokenCreate) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.tokenCreate = tokenCreate;
    }
    async register(authDto) {
        try {
            const hashedPassword = await bcrypt.hash(authDto.Admin_Password, 10);
            const admin = await this.prisma.admin.create({
                data: {
                    Admin_Name: authDto.Admin_Name,
                    Admin_Email: authDto.Admin_Email,
                    Admin_Phone: authDto.Admin_Phone,
                    Admin_Profile: authDto.Admin_Profile,
                    Admin_Password: hashedPassword,
                },
            });
            await this.emailService.sendEmail({
                to: admin.Admin_Email,
                template: Email_DTO_1.EmailTemplate.WELCOME,
                context: {
                    name: admin.Admin_Name,
                    password: authDto.Admin_Password,
                },
            });
            const tokens = this.tokenCreate.createTokens(admin);
            await this.prisma.refreshToken.upsert({
                where: { adminId: admin.AdminId },
                update: {
                    token: tokens.refreshToken,
                    issuedAt: new Date(),
                    expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
                create: {
                    adminId: admin.AdminId,
                    token: tokens.refreshToken,
                    issuedAt: new Date(),
                    expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
            return { message: 'Admin registered successfully', admin, tokens };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error registering admin');
        }
    }
    async login(email, password) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { Admin_Email: email },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const passwordMatch = await bcrypt.compare(password, admin.Admin_Password);
            if (!passwordMatch) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const tokens = this.tokenCreate.createTokens(admin);
            await this.prisma.refreshToken.upsert({
                where: { adminId: admin.AdminId },
                update: {
                    token: tokens.refreshToken,
                    issuedAt: new Date(),
                    expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
                create: {
                    adminId: admin.AdminId,
                    token: tokens.refreshToken,
                    issuedAt: new Date(),
                    expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
            return { message: 'Login successful', admin, tokens };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Login failed');
        }
    }
    async refreshAccessToken(refreshToken) {
        try {
            const payload = this.tokenCreate.verifyToken(refreshToken);
            const storedToken = await this.prisma.refreshToken.findUnique({
                where: { adminId: payload.sub },
            });
            if (!storedToken || storedToken.token !== refreshToken) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            if (new Date() > storedToken.expiryAt) {
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: payload.sub },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const tokens = this.tokenCreate.createTokens(admin);
            await this.prisma.refreshToken.update({
                where: { adminId: admin.AdminId },
                data: {
                    token: tokens.refreshToken,
                    issuedAt: new Date(),
                    expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(adminId) {
        try {
            await this.prisma.refreshToken.delete({
                where: { adminId },
            });
            return { message: 'Logout successful' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error during logout');
        }
    }
    async passwordReset(email, newPassword) {
        try {
            const findAdmin = await this.prisma.admin.findUnique({
                where: { Admin_Email: email },
            });
            if (!findAdmin) {
                throw new common_1.BadRequestException('Admin with this email does not exist');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.prisma.admin.update({
                where: { Admin_Email: email },
                data: { Admin_Password: hashedPassword },
            });
            return { message: 'Password reset successful' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error during password reset');
        }
    }
    async GetallAdmins() {
        try {
            const admins = await this.prisma.admin.findMany();
            return admins;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error while fetching admins');
        }
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        Email_service_1.EmailService,
        Authentication_TokenCreate_1.TokenCreate])
], AuthenticationService);
//# sourceMappingURL=Authentication.service.js.map