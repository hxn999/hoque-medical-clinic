import { log } from "console"
import { Contact } from "../models/contactModel.js"
import jwt from 'jsonwebtoken'
import Fille from "../models/fileModel.js";
import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Auth from "../models/authModel.js";
import Procedure from "../models/procedureModel.js";
export async function adminServer(req, res) {
     let err = ""
        let succ = ""
        if (req.query.err) err = req.query.err
        if (req.query.succ) succ = req.query.succ
    try {
        
        const files = await Fille.find({})
        res.render("admin", {
            files, err, succ
        })
    } catch (error) {
       
        res.render("admin", {
            files: [], err, succ
        })
    }
}

export async function login(req, res) {



    try {

        let credential = await Auth.findOne({_id:"679c8e205decebe5b7c631b6"})
        console.log(credential)
        if ((req.body.username.trim() === credential.username) && (req.body.pass === credential.password)) {
            console.log("hi");
            const accessToken = jwt.sign({ name: "admin", status: "authenticated" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
            res
                .status(202)
                .cookie('accessToken', accessToken, {
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 31536000000,
                    httpOnly: true,
                })
                .redirect("/admin")
        }
        else {
            throw new Error("Authentication Failed !")
        }

    } catch (error) {
        res.render("login", {
            err: error.message
        });
    }
}

export async function loginPage(req, res) {
    res.render("login", {
        err: ""
    })
}

export async function fileUpload(req, res) {
    try {
        console.log(req.file);
        console.log("jdfsdf")
        console.log(req.body);
        const fileUrl = "/file/" + req.file.filename;
        const fileData = new Fille({
            name: req.body.name,
            type:req.body.type,
            url: fileUrl
        })
        await fileData.save()
        res.redirect("/admin?succ=File+Uploaded+Successfully!")

    } catch (error) {
        console.log(error.message);

        res.redirect("/admin?err=File+Upload+Failed!")
    }

}

export async function deleteFile(req, res) {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = join(__dirname, "..", "public", req.query.url.slice(1))
        console.log(filePath);


        try {
            // Check if file exists
            // await access(`../public${filePath}`, constants.F_OK);
            // Uncomment and fix this line
            await access(filePath, constants.F_OK);

            // File exists, delete it
            await unlink(filePath);
            console.log('File was deleted successfully');
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File does not exist');
            } else {
                console.error('Error deleting file:', err);
            }
        }

        await Fille.findOneAndDelete({ url: req.query.url })
        res.redirect("/admin?succ=File+deleted+Successfully!")


    } catch (error) {
        res.redirect("/admin?err=File+deletion+Failed!")
    }
}

export async function passChange(req,res) {

    try {
        
       let credential = await Auth.findOne({_id:"679c8e205decebe5b7c631b6"})

       if(credential.password != req.body.pass) {
        throw Error("Wrong Password")
       }

       await Auth.updateOne({_id:"679c8e205decebe5b7c631b6"},{password:req.body.newPass})

       res.redirect("/admin?succ=Password+Changed+Successfully!")


    } catch (error) {
        res.redirect("/admin?err=Password+Change+Failed!")
    }


}

export async function usernameChange(req,res) {

    try {
        
 

       await Auth.updateOne({_id:"679c8e205decebe5b7c631b6"},{username:req.body.newUsername})

       res.redirect("/admin?succ=Username+Changed+Successfully!")


    } catch (error) {
        res.redirect("/admin?err=Username+Change+Failed!")
    }


}


export async function procedureUpload(req,res)
{
    try {
        const updateFields = {}; // Object to store only the fields that need to be updated
    
        // Check if fields exist and are not null, then add to updateFields
        if (req.body.link1) updateFields.info1 = req.body.link1;
        if (req.body.link2) updateFields.info2 = req.body.link2;
        if (req.files["file1"]) updateFields.form1 = "/file/" + req.files["file1"][0].filename;
        if (req.files["file2"]) updateFields.form2 = "/file/" + req.files["file2"][0].filename;
    
        // Update the document only if there's at least one field to update
        if (Object.keys(updateFields).length > 0) {
            await Procedure.updateOne(
                { _id: "679f3f03e06fc39979e55ebf" },
                { $set: updateFields }
            );
        }
    
        res.redirect("/admin?succ=File+Uploaded+Successfully!");
    } catch (error) {
        console.log(error.message);
        res.redirect("/admin?err=File+Upload+Failed!");
    }
    
}

export async function logOut(req, res) {
    try {
        res.clearCookie("accessToken")
            .redirect("/admin/login")
    } catch (error) {
        res.redirect("/admin")
    }
}
