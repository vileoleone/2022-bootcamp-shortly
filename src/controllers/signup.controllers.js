import { connectionWithDB } from "../database/db.js";
import bcrypt from "bcrypt"

export async function signupController (req, res, next) {
    const { name, email, password } = res.locals.signUpBody;
    
    const passwordHash = bcrypt.hashSync(password.toString(), 10);

    try {
        await connectionWithDB.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`, [name, email, passwordHash])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message);
        return
    }

}