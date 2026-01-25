"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FeedbackService = class FeedbackService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async accesschecktoCustomer(customerEmail) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { Cus_Email: customerEmail },
            });
            if (!customer) {
                throw new common_1.UnauthorizedException('Customer not found');
            }
            return { message: 'Access granted', customerId: customer.CustomerId };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async createFeedback(feedbackDto) {
        try {
            const checkCustomer = await this.prisma.customer.findUnique({
                where: { CustomerId: feedbackDto.CustomerId },
            });
            if (!checkCustomer) {
                throw new common_1.UnauthorizedException('Customer not found');
            }
            const checkDesign = await this.prisma.design.findUnique({
                where: { DesignID: feedbackDto.DesignID },
            });
            if (!checkDesign) {
                throw new common_1.UnauthorizedException('Design not found');
            }
            const feedback = await this.prisma.feed_Back.create({
                data: {
                    Feed_back_comment: feedbackDto.Feed_back_comment,
                    Feed_Back_Images: feedbackDto.Feed_Back_Images,
                    Rating: feedbackDto.Rating,
                    CustomerId: feedbackDto.CustomerId,
                    DesignID: feedbackDto.DesignID,
                },
            });
            return { message: 'Feedback submitted successfully', feedback };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async getAllFeedbacks(page, limit) {
        try {
            const skip = (page - 1) * limit;
            const [feedbacks, total] = await this.prisma.$transaction([
                this.prisma.feed_Back.findMany({
                    skip,
                    take: limit,
                    orderBy: {
                        Feed_backId: 'desc',
                    },
                    include: {
                        Design: true,
                        Customer: true,
                    },
                }),
                this.prisma.feed_Back.count(),
            ]);
            return {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: feedbacks,
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async deleteFeedback(feedbackId, AdminId) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: AdminId },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const feedback = await this.prisma.feed_Back.delete({
                where: { Feed_backId: feedbackId },
            });
            return { message: 'Feedback deleted successfully', feedback };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async getfeedbackByDesignId(designId) {
        try {
            const feedbacks = await this.prisma.feed_Back.findMany({
                where: { DesignID: designId },
                include: {
                    Customer: true,
                    Design: true,
                },
            });
            return feedbacks;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedbackService);
//# sourceMappingURL=Feedback.service.js.map