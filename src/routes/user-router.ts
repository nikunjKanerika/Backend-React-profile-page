import { Router } from "express";
import {getUsers,saveUser, saveUserLinks, getUser} from '../controllers/user-controller'
import { upload } from "../middlewares/multer-middleware";
const router = Router()


router.route('/saveUser').post(upload.single('profileImg'),saveUser)   //route for saving a user details
router.route('/getUsers').get(getUsers)  //route for retrieving all users from the database
router.route('/getUser/:firstName').get(getUser)    //route for retreving a user by its firstName
router.route('/saveUserLinks').post(saveUserLinks)   //route for saving the links by its firstName

export default router;