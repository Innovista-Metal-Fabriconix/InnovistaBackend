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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const Order_DTO_1 = require("./Order.DTO");
const Order_service_1 = require("./Order.service");
const Authentication_AdminAuthgurd_1 = require("../Authentication/Authentication.AdminAuthgurd");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(orderDto) {
        return this.orderService.createOrder(orderDto);
    }
    async getAllOrders(page, limit) {
        return this.orderService.getAllOrders(Number(page) || 1, Number(limit) || 10);
    }
    async getOrderById(orderId) {
        return this.orderService.getOrderById(parseInt(orderId, 10));
    }
    async stateschnage(orderId, Status) {
        return this.orderService.chagetheStates(parseInt(orderId, 10), Status);
    }
    async getordersUnique(useremail) {
        return this.orderService.getcustomerORders(useremail);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)("createOrder"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order_DTO_1.OrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)("getAllOrders"),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_2.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Get)("getOrderById"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_2.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Put)("ChangeStates"),
    __param(0, (0, common_1.Query)("orderId")),
    __param(1, (0, common_1.Query)("Status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "stateschnage", null);
__decorate([
    (0, common_1.Get)("Getordes"),
    __param(0, (0, common_1.Query)("Email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getordersUnique", null);
exports.OrderController = OrderController = __decorate([
    (0, common_2.Controller)("order"),
    __metadata("design:paramtypes", [Order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=Order.controller.js.map