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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const Email_service_1 = require("../Emails/Email.service");
const Email_DTO_1 = require("../Emails/Email.DTO");
let CustomerService = class CustomerService {
    prisma;
    emailService;
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async registedCustomer(customerDto, AdminId) {
        const Admin = await this.prisma.admin.findUnique({
            where: { AdminId: AdminId },
        });
        if (!Admin) {
            throw new common_1.UnauthorizedException('Admin not found');
        }
        try {
            const existingCustomer = await this.prisma.customer.findUnique({
                where: { Cus_Email: customerDto.Cus_Email },
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(customerDto.Cus_Password, 10);
            const customer = await this.prisma.customer.create({
                data: {
                    Cus_Name: customerDto.Cus_Name,
                    Cus_Email: customerDto.Cus_Email,
                    Cus_PhoneNumber: customerDto.Cus_PhoneNumber,
                    Cus_Password: hashedPassword,
                    Cus_CompanyName: customerDto.Cus_CompanyName,
                    Cus_Logo: customerDto.Cus_Logo,
                    Verify_State: false,
                    Purchase_Goods: customerDto.Purchase_Goods,
                },
            });
            await this.emailService.sendEmail({
                to: customerDto.Cus_Email,
                template: Email_DTO_1.EmailTemplate.CUSTOMER_WELCOME,
                context: {
                    name: customerDto.Cus_Name,
                    Link: `http://localhost:5173/CustomerVerify?customerId=${customer.CustomerId}`,
                },
            });
            return {
                message: 'Customer registered successfully. Check your email for verification.',
                customer,
            };
        }
        catch (error) {
            console.error('Prisma error:', error);
            throw new common_1.BadRequestException('Failed to register customer: ' + error.message);
        }
    }
    async changePassword(customerId, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const customer = await this.prisma.customer.update({
                where: { CustomerId: customerId },
                data: { Cus_Password: hashedPassword },
            });
            return { message: 'Password changed successfully', customer };
        }
        catch (error) {
            console.error('Prisma error:', error);
            throw new common_1.BadRequestException('Failed to change password: ' + error.message);
        }
    }
    async verifyCustomerEmail(customerId) {
        try {
            const customer = await this.prisma.customer.update({
                where: { CustomerId: customerId },
                data: { Verify_State: true },
            });
            return { message: 'Email verified successfully', customer };
        }
        catch (error) {
            console.error('Prisma error:', error);
            throw new common_1.BadRequestException('Failed to verify email: ' + error.message);
        }
    }
    async getAllCustomers() {
        try {
            const customers = await this.prisma.customer.findMany();
            return customers;
        }
        catch (error) {
            console.error('Prisma error:', error);
            throw new common_1.BadRequestException('Failed to retrieve customers: ' + error.message);
        }
    }
    async removeCustomer(customerId, AdminId) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: AdminId },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const customer = await this.prisma.customer.delete({
                where: { CustomerId: customerId },
            });
            await this.emailService.sendEmail({
                to: customer.Cus_Email,
                template: Email_DTO_1.EmailTemplate.CUSTOMER_REMOVE,
                context: {
                    name: customer.Cus_Name,
                },
            });
            return { message: 'Customer deleted successfully', customer };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete customer: ' + error.message);
        }
    }
    async updateCustomer(customerDto, AdminId) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: AdminId },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const customer = await this.prisma.customer.update({
                where: { CustomerId: customerDto.CustomerId },
                data: {
                    Cus_Name: customerDto.Cus_Name,
                    Cus_Email: customerDto.Cus_Email,
                    Cus_PhoneNumber: customerDto.Cus_PhoneNumber,
                    Cus_CompanyName: customerDto.Cus_CompanyName,
                    Cus_Logo: customerDto.Cus_Logo,
                    Purchase_Goods: customerDto.Purchase_Goods,
                },
            });
            return { message: 'Customer updated successfully', customer };
        }
        catch (error) {
            console.error('Prisma error:', error);
            throw new common_1.BadRequestException('Failed to update customer: ' + error.message);
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        Email_service_1.EmailService])
], CustomerService);
//# sourceMappingURL=Customer.service.js.map