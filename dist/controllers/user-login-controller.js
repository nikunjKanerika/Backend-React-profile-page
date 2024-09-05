"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const Connection_1 = require("../db/Connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const logger_1 = __importDefault(require("../utils/logger"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
dotenv_1.default.config();
//Signup the user
exports.signUp = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield Connection_1.client.query('INSERT INTO users("firstName", "lastName", email, password) VALUES($1, $2, $3, $4)', [firstName, lastName, email, hashedPassword]);
    logger_1.default.info('User Signed up successfully');
    res.status(201).json({ msg: 'Signed up successfully' });
}));
//Login the user
exports.login = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield Connection_1.client.query('SELECT * FROM "users" WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
        logger_1.default.error('User not found');
        return res.status(400).json({ errorMsg: 'User not found' });
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        const err = new CustomError_1.default('Invalid credentials', 404);
        return next(err);
    }
    // Generate JWT
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
    logger_1.default.info('Login successful');
    res.status(200).json({ msg: 'Login successful', token });
}));
//# sourceMappingURL=user-login-controller.js.map