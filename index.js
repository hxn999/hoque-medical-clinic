import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import cors from 'cors'
import { fileURLToPath } from 'node:url';

import homeRouter from './routes/homeRouter.js';
import formRouter from './routes/formRouter.js';
import adminRouter from './routes/adminRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
dotenv.config()

app.use(cors({credentials:true}))


// database connection

async function database() {
    await mongoose.connect(process.env.MONGO_STRING)
}
database().then(()=>console.log("database connected!!")).catch(()=>console.log("database not connected"))



// request parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// set view engine
app.set("view engine" , "ejs")

// set static folder
app.use(express.static(path.join(__dirname,'public')));


// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

// routing setup
app.use('/',homeRouter)
app.use('/book',formRouter)
app.use('/admin',adminRouter)

// 404 error handling
// app.use(notFoundHandler)

// common error handling
// app.use(errorHandler)

// server startup
app.listen(process.env.PORT  , ()=> console.log("Server running on PORT 3000! http://localhost:3000"))
