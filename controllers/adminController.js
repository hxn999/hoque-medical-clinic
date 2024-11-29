import { log } from "console"
import { Contact } from "../models/contactModel.js"

export async function adminServer(req,res)
{

    const messages = await Contact.find({})
    console.log(messages)
    res.render("admin",{messages})
}