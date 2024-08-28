"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
//Handling file
const storage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=multer-middleware.js.map