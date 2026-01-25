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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const Customer_DTO_1 = require("./Customer.DTO");
const Customer_service_1 = require("./Customer.service");
const Authentication_AdminAuthgurd_1 = require("../Authentication/Authentication.AdminAuthgurd");
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    async registerCustomer(customerDto, req) {
        const AdminId = req.user?.userId;
        if (!AdminId) {
            throw new Error('AdminId is missing');
        }
        return this.customerService.registedCustomer(customerDto, parseInt(AdminId, 10));
    }
    async getAllCustomers(page, limit) {
        return this.customerService.getAllCustomers(Number(page) || 1, Number(limit) || 10);
    }
    async verifyCustomer(customerId) {
        return this.customerService.verifyCustomerEmail(parseInt(customerId, 10));
    }
    async deleteCustomer(customerId, req) {
        const AdminId = req.user?.userId;
        if (!AdminId) {
            throw new Error('AdminId is missing');
        }
        return this.customerService.removeCustomer(parseInt(customerId, 10), parseInt(AdminId, 10));
    }
    async updateCustomer(UpdateCustomer, req) {
        const AdminId = req.user?.userId;
        if (!AdminId) {
            throw new Error('AdminId is missing');
        }
        return this.customerService.updateCustomer(UpdateCustomer, parseInt(AdminId, 10));
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Post)('Customer_register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Customer_DTO_1.CustomerDTO, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "registerCustomer", null);
__decorate([
    (0, common_1.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Get)('getAllCustomers'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Post)('verifyCustomer'),
    __param(0, (0, common_1.Query)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "verifyCustomer", null);
__decorate([
    (0, common_1.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Delete)('deleteCustomer'),
    __param(0, (0, common_1.Query)('customerId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Put)('updateCustomer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Customer_DTO_1.UpdateCustomer, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [Customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=Customer.controller.js.map