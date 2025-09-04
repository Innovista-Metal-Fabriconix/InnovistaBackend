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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCreate = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let TokenCreate = class TokenCreate {
    privateKey;
    constructor() {
        if (!process.env.JWT_PRIVATE_KEY) {
            throw new common_1.InternalServerErrorException('JWT_PRIVATE_KEY environment variable is not set');
        }
        this.privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
    }
    createToken(admin) {
        const payload = {
            AdminId: admin.AdminId,
            Admin_Name: admin.Admin_Name,
            Admin_Email: admin.Admin_Email,
            Admin_Phone: admin.Admin_Phone,
            Admin_Profile: admin.Admin_Profile,
            role: 'Admin',
        };
        return jsonwebtoken_1.default.sign(payload, this.privateKey, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
    }
};
exports.TokenCreate = TokenCreate;
exports.TokenCreate = TokenCreate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TokenCreate);
//# sourceMappingURL=Authentication.TokenCreate.js.map