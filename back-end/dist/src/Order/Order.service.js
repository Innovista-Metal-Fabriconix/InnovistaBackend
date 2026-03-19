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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const Email_service_1 = require("../Emails/Email.service");
const Email_DTO_1 = require("../Emails/Email.DTO");
const Notification_service_1 = require("../Notification/Notification.service");
let OrderService = class OrderService {
    prisma;
    emailService;
    notificationService;
    constructor(prisma, emailService, notificationService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }
    async createOrder(orderDto) {
        try {
            const findCustomer = await this.prisma.customer.findUnique({
                where: { Cus_Email: orderDto.Client_Email },
            });
            const orderData = {
                Order_Status: orderDto.Order_Status,
                Order_Date: orderDto.Order_Date ?? new Date(),
                Client_Name: orderDto.Client_Name,
                Client_Email: orderDto.Client_Email,
                Client_Number: orderDto.Client_Number,
                CustomerId: findCustomer ? findCustomer.CustomerId : null,
                Designs: {
                    create: orderDto.Designs?.map((d) => ({
                        Design: {
                            connect: { DesignID: d.DesignID },
                        },
                    })) || [],
                },
            };
            const order = await this.prisma.order.create({
                data: orderData,
                include: {
                    Customer: true,
                    Designs: {
                        include: {
                            Design: true,
                        },
                    },
                },
            });
            await this.notificationService.createNotification({
                SenderEmail: 'innovista.itdep@gmail.com',
                Recevied_Emails: [order.Client_Email ?? ''],
                Notifications_Body: 'Your order has been created successfully.',
                Notifications_Title: 'Order Confirmation',
            });
            await this.emailService.sendEmail({
                to: order.Client_Email ?? '',
                template: Email_DTO_1.EmailTemplate.ORDER_CONFIRMATION,
                context: {
                    order: order,
                },
            });
            return { message: 'Order created successfully', order };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async getAllOrders(page, limit) {
        try {
            const skip = (page - 1) * limit;
            const [orders, total] = await this.prisma.$transaction([
                this.prisma.order.findMany({
                    skip,
                    take: limit,
                    orderBy: {
                        OrderID: 'desc',
                    },
                    include: {
                        Customer: true,
                        Designs: {
                            include: {
                                Design: true,
                            },
                        },
                    },
                }),
                this.prisma.order.count(),
            ]);
            return {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: orders,
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async chagetheStates(orderId, Status) {
        try {
            const findOrder = await this.prisma.order.findUnique({
                where: { OrderID: orderId },
            });
            if (!findOrder) {
                throw new common_1.BadRequestException("Order details can't find");
            }
            await this.prisma.order.update({
                where: { OrderID: orderId },
                data: { Order_Status: Status },
            });
            return { message: `Change States to ${Status}` };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async getcustomerORders(Client_Email) {
        try {
            const findOrders = await this.prisma.order.findMany({
                where: { Client_Email: Client_Email },
                include: {
                    Designs: {
                        include: {
                            Design: true,
                        },
                    },
                },
            });
            return findOrders;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getOrderById(orderId) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { OrderID: orderId },
                include: {
                    Customer: true,
                    Designs: {
                        include: {
                            Design: true,
                        },
                    },
                },
            });
            if (!order) {
                throw new common_1.BadRequestException('Order not found');
            }
            await this.emailService.sendEmail({
                to: order.Client_Email ?? '',
                template: Email_DTO_1.EmailTemplate.ORDER_CONFIRMATION,
                context: {
                    order: order,
                },
            });
            return order;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        Email_service_1.EmailService,
        Notification_service_1.NotificationService])
], OrderService);
//# sourceMappingURL=Order.service.js.map