import express from 'express'
import { adminServer } from '../controllers/adminController.js'


const adminRouter = express.Router()


adminRouter.get("/",adminServer)
// adminRouter.get("/drug-list",drugForm)
// adminRouter.get("/medications",mediForm)

export default adminRouter