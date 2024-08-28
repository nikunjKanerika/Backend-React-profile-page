import  multer from "multer";
import { fileURLToPath } from "url";

//Handling file
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage }) 