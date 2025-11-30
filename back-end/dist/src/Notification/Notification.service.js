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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NotificationService = class NotificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNotification(notificationDto) {
        try {
            const notification = await this.prisma.notifications.create({
                data: {
                    SenderEmail: notificationDto.SenderEmail,
                    Recevied_Emails: notificationDto.Recevied_Emails,
                    View_List: notificationDto.View_List || [],
                    Notifications_Body: notificationDto.Notifications_Body,
                    Notifications_Title: notificationDto.Notifications_Title,
                    Date_Timestamp: notificationDto.Date_Timestamp || new Date(),
                },
            });
            return notification;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async markAsRead(Adminemail, NotificationsID) {
        try {
            const notification = await this.prisma.notifications.findUnique({
                where: { NotificationsID: NotificationsID },
            });
            if (!notification) {
                throw new Error('Notification not found');
            }
            const updatedViewList = notification.View_List || [];
            if (!updatedViewList.includes(Adminemail)) {
                updatedViewList.push(Adminemail);
            }
            await this.prisma.notifications.update({
                where: { NotificationsID: NotificationsID },
                data: { View_List: updatedViewList },
            });
            return { message: 'Notification view succesfully' };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async getNotifications(Adminemail) {
        try {
            const notifications = await this.prisma.notifications.findMany({
                where: {
                    NOT: {
                        View_List: {
                            has: Adminemail,
                        },
                    },
                },
            });
            return notifications;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=Notification.service.js.map