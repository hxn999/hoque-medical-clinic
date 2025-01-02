import jwt from 'jsonwebtoken'

export async function authCheck(req, res, next) {

    try {

        // verifying user jwt access token

        const user = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (user) {

            // authentication successfull and forwarding to the next function
            next()
        }

        else {

            // there is no data in the token , so it is unauthorized
            throw Error("Unauthorized !!")
        }

    }


    // if the jwt access token failed to verify or expires

    catch (error) {
        res.redirect("/admin/login")
    }
}