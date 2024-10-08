"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => next(err));
    };
};
//# sourceMappingURL=asyncErrorHandler.js.map