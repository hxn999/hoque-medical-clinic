import express from 'express'
import { contactForm, homeServer } from '../controllers/homeController.js'

const homeRouter = express.Router()


homeRouter.get("/",homeServer)
homeRouter.post("/",contactForm)

export default homeRouter