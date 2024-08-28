"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        const err = new CustomError_1.default('No authentication header', 400);
        return next(err);
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(err);
        }
        req.user = user;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth-middleware.js.map