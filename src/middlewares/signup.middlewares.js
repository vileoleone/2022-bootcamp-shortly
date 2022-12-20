import { signUpSchemaModel } from "../models/signup.js";

import { connectionWithDB } from "../database/db.js";

export async function signUpSchemaValidation(req, res, next) {
    const signUpBody = req.body;
    const { email } = signUpBody
    const { error } = signUpSchemaModel.validate(signUpBody, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(422).send(`There is a body validation problem: ${errors}`)
    }

    try {
        const emailInDB = await connectionWithDB.query(`SELECT email FROM users WHERE email = $1`, [email])

        if (emailInDB.rowCount !== 0) {
            return res.status(409).send("The email is already registered");
        }

    } catch (err) {
        res.status(500).send(err.message);
        return
    }

    res.locals.signUpBody = signUpBody;
    
    next()

}

