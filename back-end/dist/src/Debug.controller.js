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
exports.DebugController = void 0;
const common_1 = require("@nestjs/common");
let DebugController = class DebugController {
    test() {
        return {
            status: 'CORS is working',
            timestamp: new Date().toISOString(),
            message: 'If you can see this, the basic CORS configuration is correct for this route.'
        };
    }
    checkEnv() {
        return {
            JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY ? 'Defined (Length: ' + process.env.JWT_PRIVATE_KEY.length + ')' : 'UNDEFINED',
            DATABASE_URL: process.env.DATABASE_URL ? 'Defined' : 'UNDEFINED',
            FRONTEND_URL: process.env.FRONTEND_URL || 'UNDEFINED',
            NODE_ENV: process.env.NODE_ENV || 'UNDEFINED',
            PORT: process.env.PORT || 'UNDEFINED',
        };
    }
};
exports.DebugController = DebugController;
__decorate([
    (0, common_1.Get)('cors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DebugController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('env'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DebugController.prototype, "checkEnv", null);
exports.DebugController = DebugController = __decorate([
    (0, common_1.Controller)('debug')
], DebugController);
//# sourceMappingURL=Debug.controller.js.map