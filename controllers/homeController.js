import { Contact } from "../models/contactModel.js"

export function homeServer(req, res) {
    res.render("index", {
        msg:"",
        error:""
    })

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