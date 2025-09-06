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
exports.DesignsController = void 0;
const common_1 = require("@nestjs/common");
const Designs_service_1 = require("./Designs.service");
const Designs_DTO_1 = require("./Designs.DTO");
const Authentication_AdminAuthgurd_1 = require("../Authentication/Authentication.AdminAuthgurd");
let DesignsController = class DesignsController {
    designsService;
    constructor(designsService) {
        this.designsService = designsService;
    }
    async createDesigns(designDto, req) {
        const AdminId = req.user.userId;
        return this.designsService.createDesign(designDto, AdminId);
    }
    async getAllDesigns() {
        return this.designsService.getAllDesigns();
    }
    async deleteDesigns(designId, req) {
        const AdminId = req.user.userId;
        return this.designsService.deleteDesign(parseInt(designId, 10), AdminId);
    }
};
exports.DesignsController = DesignsController;
__decorate([
    (0, common_1.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Designs_DTO_1.DesignDTO, Object]),
    __metadata("design:returntype", Promise)
], DesignsController.prototype, "createDesigns", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DesignsController.prototype, "getAllDesigns", null);
__decorate([
    (0, common_1.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Delete)("deleteDesign"),
    __param(0, (0, common_1.Query)('designId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DesignsController.prototype, "deleteDesigns", null);
exports.DesignsController = DesignsController = __decorate([
    (0, common_1.Controller)("designs"),
    __metadata("design:paramtypes", [Designs_service_1.DesignsService])
], DesignsController);
//# sourceMappingURL=Designs.controller.js.map