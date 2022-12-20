import { connectionWithDB } from "../database/db.js"
import { UrlSchemaValidation } from "../models/urls.js";

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (token === undefined) {
        res.status(401).send("missing token")
        return
    }

    const userObj = await connectionWithDB.query(`SELECT sessions."userId" FROM sessions WHERE token = $1`, [token]);

    if (userObj.rowCount === 0) {
        res.status(401).send("Token Authentication failed")
        return
    }
    res.locals.userId = userObj.rows[0].userId;
    next()
}

export function UrlBodyValidation(req, res, next) {
    const url = req.body

    const { error } = UrlSchemaValidation.validate(url, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(`There is a body validation problem: ${errors}`)
    }

    res.locals.url = url

    next()
}

export async function filterUserIdUrls(req, res, next) {
    
    try {
        const urlsObjById = await connectionWithDB.query(`SELECT * FROM urls WHERE "id" = $1`, [req.params.id])
        
        if (urlsObjById.rowCount === 0) {
           return res.status(404).send("Url not found")
        }

        if (urlsObjById.rows[0].userId !== res.locals.userId) {
            return res.status(401).send("The URl does not belong to the user")
        }

        next()
        
    } catch (err) {
        res.status(500).send(err.message)
    }


}