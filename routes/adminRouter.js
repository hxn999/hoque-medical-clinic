import express from 'express'
import { adminServer, deleteFile, fileUpload, login,loginPage } from '../controllers/adminController.js'
import { authCheck } from '../middlewares/auth.js'
import { publicAuthCheck } from '../middlewares/publicAuth.js'
import { fileLoader } from 'ejs'
import upload from '../middlewares/upload.js'


const adminRouter = express.Router()


adminRouter.get("/",authCheck,adminServer)
adminRouter.post("/login",login)
adminRouter.get("/login",publicAuthCheck,loginPage)
adminRouter.post("/file",authCheck,upload.single('file'),fileUpload)
adminRouter.post("/delete",authCheck,deleteFile)
// adminRouter.get("/drug-list",drugForm)
// adminRouter.get("/medications",mediForm)

export default adminRouter