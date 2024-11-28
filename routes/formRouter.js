import express from 'express'
import { drugForm, mediForm, regForm } from '../controllers/formController.js'

const formRouter = express.Router()


formRouter.get("/",regForm)
formRouter.get("/drug-list",drugForm)
formRouter.get("/medications",mediForm)

export default formRouter