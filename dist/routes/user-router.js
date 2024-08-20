"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const multer_middleware_1 = require("../middlewares/multer-middleware");
const router = (0, express_1.Router)();
router.route('/saveUser').post(multer_middleware_1.upload.single('profileImg'), user_controller_1.saveUser); //route for saving a user details
router.route('/getUsers').get(user_controller_1.getUsers); //route for retrieving all users from the database
router.route('/getUser/:firstName').get(user_controller_1.getUser); //route for retreving a user by its firstName
router.route('/saveUserLinks').post(user_controller_1.saveUserLinks); //route for saving the links by its firstName
exports.default = router;
//# sourceMappingURL=user-router.js.map