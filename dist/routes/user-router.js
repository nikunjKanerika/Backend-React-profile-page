"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const user_login_controller_1 = require("../controllers/user-login-controller");
const multer_middleware_1 = require("../middlewares/multer-middleware");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const router = (0, express_1.Router)();
router.route('/signup').post(user_login_controller_1.signUp); //route for signup the new user
router.route('/login').post(user_login_controller_1.login); //route for logging in the user
router.route('/saveUser').patch(auth_middleware_1.authenticateJWT, multer_middleware_1.upload.single('profileImg'), user_controller_1.saveUser); //route for saving a user details
router.route('/getUsers').get(user_controller_1.getUsers); //route for retrieving all users from the database
router.route('/getUser').get(auth_middleware_1.authenticateJWT, user_controller_1.getUser); //route for retreving a user by user's id
router.route('/getLinks').get(auth_middleware_1.authenticateJWT, user_controller_1.getLinks); //route for retreving user links by user's id
router.route('/saveUserLinks').post(auth_middleware_1.authenticateJWT, user_controller_1.saveUserLinks); //route for saving the links by user's id
router.route('/deleteLink/:id').delete(auth_middleware_1.authenticateJWT, user_controller_1.deleteLink); //route for saving the links by user's id
exports.default = router;
//# sourceMappingURL=user-router.js.map