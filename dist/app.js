"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_controller_1 = __importDefault(require("./controllers/error-controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
//routes import
const user_router_1 = __importDefault(require("./routes/user-router"));
app.all('*');
//routes declaration
app.use('/api/v1', user_router_1.default);
//global error handling middleware
app.use(error_controller_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map