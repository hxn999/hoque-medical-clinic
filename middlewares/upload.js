import multer from "multer";
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/file"));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const newFileName = file.originalname
            .replace(ext, "")
            .split(" ")
            .join("-")
            + Date.now() + ext

        cb(null, newFileName)
    }
})

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000,
    },
    fileFilter:function (req,file,cb){
        const allowedFields = ['file1', 'file2']; // Allowed field names

        if (allowedFields.includes(file.fieldname)) {
            cb(null, true);
        } 
        if(file.fieldname=="file")
        {

            cb(null,true)
        }
       
    }
})
export default upload