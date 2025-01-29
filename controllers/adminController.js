import { log } from "console"
import { Contact } from "../models/contactModel.js"
import jwt from 'jsonwebtoken'
import Fille from "../models/fileModel.js";
import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function adminServer(req, res) {
    try {
        let err = ""
        let succ = ""
        if (req.query.err) err = req.query.err
        if (req.query.succ) succ = req.query.succ
        const files = await Fille.find({})
        res.render("admin", {
            files, err, succ
        })
    } catch (error) {
        let err = ""
        let succ = ""
        if (req.query.err) err = req.query.err
        if (req.query.succ) succ = req.query.succ
        res.render("admin", {
            files: [], err, succ
        })
    }
}

export async function login(req, res) {



    try {
        if ((req.body.username.trim() === process.env.USERNAME) && (req.body.pass === process.env.PASS)) {
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
        console.log(req.body);
        const fileUrl = "/file/" + req.file.filename;
        const fileData = new Fille({
            name: req.body.name,
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

export async function logOut(req, res) {
    try {
        res.clearCookie("accessToken")
            .redirect("/admin/login")
    } catch (error) {
        res.redirect("/admin")
    }
}