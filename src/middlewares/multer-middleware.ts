import  multer from "multer";
import * as path from 'path';
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const dirname = path.dirname(''); // get the name of the directory


//Handling file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(dirname,'../../public'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage }) 