import express from 'express'
import { drugForm, mediForm, regForm, regFormHandler } from '../controllers/formController.js'

const formRouter = express.Router()


formRouter.get("/",regForm)
formRouter.post("/",regFormHandler)
formRouter.get("/drug-list",drugForm)
formRouter.get("/medications",mediForm)

export default formRouter