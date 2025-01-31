import express from 'express'
import { contactForm, homeServer, preOps } from '../controllers/homeController.js'

const homeRouter = express.Router()


homeRouter.get("/",homeServer)
homeRouter.get("/pre-op",preOps)
homeRouter.post("/",contactForm)

export default homeRouter