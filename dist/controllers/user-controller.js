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
exports.getUser = exports.saveUserLinks = exports.saveUser = exports.getUsers = void 0;
const user_model_js_1 = __importDefault(require("../models/user-model.js"));
const cloudinary_config_js_1 = __importDefault(require("../utils/cloudinary-config.js"));
//Retrieving users 
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_js_1.default.find();
        res.status(200).json({ messgae: 'here are users', users });
    }
    catch (error) {
        res.status(500).json({ message: 'Error in finding the user' });
    }
});
exports.getUsers = getUsers;
//Saving user in database
const saveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'send the valid data' });
        }
        let profileUrl = '';
        if (req.file && req.file.path) {
            const uploadResult = yield (0, cloudinary_config_js_1.default)(req.file.path);
            if (uploadResult && uploadResult.secure_url) {
                profileUrl = uploadResult.secure_url;
            }
            else {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }
        }
        const user = new user_model_js_1.default({
            firstName,
            lastName,
            email,
            profileImg: profileUrl
        });
        yield user.save();
        return res.status(201).json({ message: 'user created succesfully', user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to save user', errorMsg: error.message });
    }
});
exports.saveUser = saveUser;
//Saving each user links
const saveUserLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, userLinks } = req.body;
    try {
        // Find the user by firstName and update their links
        const user = yield user_model_js_1.default.findOneAndUpdate({ firstName }, { $set: { links: userLinks } }, { new: true, upsert: true });
        if (user) {
            return res.status(200).json({ message: 'User links updated successfully', userLinks: user.links });
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to update user links', error });
    }
});
exports.saveUserLinks = saveUserLinks;
//Retrieving user by first name
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName } = req.params;
    try {
        const user = yield user_model_js_1.default.findOne({ firstName });
        if (user) {
            return res.status(200).json({ message: 'User links retrieved successfully', user: user });
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve user links', error });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=user-controller.js.map