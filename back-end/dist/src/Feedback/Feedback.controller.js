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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const Feedback_DTO_1 = require("./Feedback.DTO");
const Feedback_service_1 = require("./Feedback.service");
const Authentication_AdminAuthgurd_1 = require("../Authentication/Authentication.AdminAuthgurd");
let FeedbackController = class FeedbackController {
    feedbackService;
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    async accesschecktoCustomer(customerEmail) {
        return this.feedbackService.accesschecktoCustomer(customerEmail);
    }
    async createFeedback(feedbackDto) {
        return this.feedbackService.createFeedback(feedbackDto);
    }
    async getAllFeedbacks(page, limit) {
        return this.feedbackService.getAllFeedbacks(Number(page) || 1, Number(limit) || 10);
    }
    async deleteFeedback(feedbackId, req) {
        const AdminId = req.user?.userId;
        if (!AdminId) {
            throw new Error('AdminId is missing');
        }
        return this.feedbackService.deleteFeedback(parseInt(feedbackId, 10), parseInt(AdminId, 10));
    }
    async getFeedbackByDesignId(designId) {
        return this.feedbackService.getfeedbackByDesignId(parseInt(designId, 10));
    }
};
exports.FeedbackController = FeedbackController;
__decorate([
    (0, common_1.Post)('AccessToCustomer'),
    __param(0, (0, common_1.Query)('customerEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "accesschecktoCustomer", null);
__decorate([
    (0, common_1.Post)('createFeedback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Feedback_DTO_1.FeedbackDTO]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Get)('allFeedbacks'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getAllFeedbacks", null);
__decorate([
    (0, common_2.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Delete)('deleteFeedback'),
    __param(0, (0, common_1.Query)('feedbackId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "deleteFeedback", null);
__decorate([
    (0, common_1.Get)('feedbackByDesignId'),
    __param(0, (0, common_1.Query)('designId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getFeedbackByDesignId", null);
exports.FeedbackController = FeedbackController = __decorate([
    (0, common_2.Controller)('feedback'),
    __metadata("design:paramtypes", [Feedback_service_1.FeedbackService])
], FeedbackController);
//# sourceMappingURL=Feedback.controller.js.map