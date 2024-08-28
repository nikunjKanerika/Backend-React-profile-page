import { Router } from "express";
import {getUsers,saveUser, saveUserLinks, getUser, deleteLink,getLinks} from '../controllers/user-controller'
import {login, signUp} from '../controllers/user-login-controller'
import { upload } from "../middlewares/multer-middleware";
import { authenticateJWT } from "../middlewares/auth-middleware";
const router = Router()

router.route('/signup').post(signUp)   //route for signup the new user
router.route('/login').post(login)   //route for logging in the user


router.route('/saveUser').patch(authenticateJWT,upload.single('profileImg'),saveUser)   //route for saving a user details
router.route('/getUsers').get(getUsers)  //route for retrieving all users from the database
router.route('/getUser').get(authenticateJWT,getUser)    //route for retreving a user by user's id
router.route('/getLinks').get(authenticateJWT,getLinks)    //route for retreving user links by user's id
router.route('/saveUserLinks').post(authenticateJWT,saveUserLinks)   //route for saving the links by user's id
router.route('/deleteLink/:id').delete(authenticateJWT,deleteLink)   //route for saving the links by user's id


export default router;