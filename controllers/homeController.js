import { Contact } from "../models/contactModel.js"
import Fille from "../models/fileModel.js"

export async function homeServer(req, res) {
try {

    const files = await Fille.find({})

    res.render("index", {
        msg:"",
        error:"",
        files:files
    })
} catch (error) {
    
    res.render("index", {
        msg:"",
        error:"",
        files:[]
    })
}


}

export async function contactForm(req, res) {
    try {
        const form = new Contact(req.body)
        await form.save()
        
        res.render("index",{
            msg:"Your Form was submitted successfully!",
            error:""
        })
        
    } catch (error) {
        res.render("index",{
            msg:"",
            error:"An error `occured` | Please Try again"
        })
    }
}