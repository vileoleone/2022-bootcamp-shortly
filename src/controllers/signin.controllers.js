import {v4 as uuid} from "uuid"
import { connectionWithDB } from "../database/db.js";

export async function signInController(req, res) {
    const { id } = res.locals.signInbodyValidated;
    delete (res.locals.signInbodyValidated.password)
    let token;


    try {
        const logInUserToken = await connectionWithDB.query(`SELECT * from sessions where "userId" = $1`, [id])
        if (logInUserToken.rowCount !== 0) {
            token = logInUserToken.rows[0].token;
        } else {
            token = uuid()

            await connectionWithDB.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token])
        }

        res.status(200).send({ token })
    } catch (err) {
        res.status(500).send(err.message)
    }
    

}