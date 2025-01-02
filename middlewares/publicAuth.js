import jwt from 'jsonwebtoken'

export async function publicAuthCheck(req, res, next) {

    try {

        // verifying user jwt access token

        const user = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(user);
        

        if (user) {

            // authentication successfull and forwarding to the next function
            res.redirect("/admin")
        }

        else {

            // there is no data in the token , so it is unauthorized
            next()
        }

    }


    // if the jwt access token failed to verify or expires

    catch (error) {
        next()
    }
}