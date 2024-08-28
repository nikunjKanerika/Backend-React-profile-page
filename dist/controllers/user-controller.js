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
exports.getLinks = exports.deleteLink = exports.getUser = exports.saveUserLinks = exports.saveUser = exports.getUsers = void 0;
const cloudinary_config_1 = __importDefault(require("../utils/cloudinary-config"));
const Connection_1 = require("../db/Connection");
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
//Retrieving users 
exports.getUsers = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Connection_1.client.query('select * from users');
    res.status(200).json(result.rows);
}));
//Saving user in database
exports.saveUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email } = req.body;
    const { id } = req.user;
    if (!firstName || !lastName || !email) {
        const err = new CustomError_1.default(`Send the valid data`, 400);
        return next(err);
    }
    let profileUrl = '';
    if (!req.file || !req.file.path) {
        const err = new CustomError_1.default(`Image file not found`, 400);
        return next(err);
    }
    const uploadResult = yield (0, cloudinary_config_1.default)(req.file.path);
    if (!uploadResult || !uploadResult.secure_url) {
        const err = new CustomError_1.default(`Failed to upload on cloudinary `, 500);
        return next(err);
    }
    profileUrl = uploadResult.secure_url;
    const result = yield Connection_1.client.query('UPDATE users SET profile_url = $1 WHERE id = $2 RETURNING *', [profileUrl, id]);
    if (!result.rows[0]) {
        const err = new CustomError_1.default(`Failed to update user profile`, 500);
        return next(err);
    }
    return res.status(200).json({ message: 'Profile updated successfully' });
}));
//Saving each user links
exports.saveUserLinks = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = user;
    const { userLinks } = req.body;
    if (!id || !userLinks) {
        const err = new CustomError_1.default(`Send the id and userlinks`, 400);
        return next(err);
    }
    userLinks.map((link) => __awaiter(void 0, void 0, void 0, function* () {
        const platform = link.platform;
        const url = link.url;
        const user_id = id;
        yield Connection_1.client.query('insert into user_links(platform,url,user_id) values($1,$2,$3)', [platform, url, user_id]);
    }));
    res.status(201).json({ message: 'Links created successfully' });
}));
//get user
exports.getUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const user = yield Connection_1.client.query('SELECT * FROM USERS WHERE id=$1', [id]);
    if (!user) {
        const err = new CustomError_1.default(`No user with this id`, 404);
        return next(err);
    }
    const links = yield Connection_1.client.query('SELECT * FROM user_links WHERE user_id=$1', [id]);
    if (!links) {
        const err = new CustomError_1.default(`No links found `, 404);
        return next(err);
    }
    user.rows[0].links = links.rows;
    if (user.rowCount)
        res.json({ user: user.rows[0] });
}));
exports.deleteLink = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Connection_1.client.query('DELETE FROM user_links WHERE id=$1 RETURNING *', [id]);
    res.status(201).json({ message: 'Link deleted successfully' });
}));
exports.getLinks = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const result = yield Connection_1.client.query('select * from user_links where user_id=$1', [id]);
    if (!result.rows) {
        const err = new CustomError_1.default('Invalid user id', 400);
        return next(err);
    }
    res.status(200).json({ links: result.rows });
}));
//# sourceMappingURL=user-controller.js.map