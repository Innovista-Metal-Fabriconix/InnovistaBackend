"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const Authentication_module_1 = require("./Authentication/Authentication.module");
const Email_module_1 = require("./Emails/Email.module");
const Designs_module_1 = require("./Designs/Designs.module");
const Customer_module_1 = require("./Customer/Customer.module");
const Feedback_module_1 = require("./Feedback/Feedback.module");
const Order_module_1 = require("./Order/Order.module");
const Notification_module_1 = require("./Notification/Notification.module");
const Projects_module_1 = require("./Projects/Projects.module");
const Debug_controller_1 = require("./Debug.controller");
const app_controller_1 = require("./app.controller");
const core_1 = require("@nestjs/core");
const AllExceptions_filter_1 = require("./AllExceptions.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            Authentication_module_1.AuthenticationModule,
            Email_module_1.EmailModule,
            Designs_module_1.DesignsModule,
            Customer_module_1.CustomerModule,
            Feedback_module_1.FeedbackModule,
            Order_module_1.OrderModule,
            Notification_module_1.NotificationModule,
            Projects_module_1.ProjectsModule
        ],
        controllers: [app_controller_1.AppController, Debug_controller_1.DebugController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: AllExceptions_filter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map