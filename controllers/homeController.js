import { Contact } from "../models/contactModel.js"
import Fille from "../models/fileModel.js"
import Procedure from "../models/procedureModel.js"

export async function homeServer(req, res) {
try {

    const files = await Fille.find({})
    const procedures = await Procedure.findById({_id:"679f3f03e06fc39979e55ebf"})
    console.log(procedures);
    
    res.render("index", {
        msg:"",
        error:"",
        files:files,
        procedures
    })
} catch (error) {
    
    res.render("index", {
        msg:"",
        error:"",
        files:[],
        procedures:{}
    })
}


}
export async function preOps(req, res) {
try {

    const files = await Fille.find({})

    res.render("pre-op", {
        msg:"",
        error:"",
        files:files
    })
} catch (error) {
    
    res.render("pre-op", {
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