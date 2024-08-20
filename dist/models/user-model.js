"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const linkSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true
    },
    platform: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Second name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    profileImg: {
        type: String
    },
    links: [linkSchema]
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user-model.js.map