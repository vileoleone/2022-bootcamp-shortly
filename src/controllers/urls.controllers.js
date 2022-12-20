
import { nanoid } from "nanoid";
import { connectionWithDB } from "../database/db.js";

export async function urlShortenController(req, res) {
    const userId = res.locals.userId
    let shortUrl = res.locals.url
    shortUrl = nanoid();

    try {
        await connectionWithDB.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [userId, res.locals.url.url, shortUrl])
        res.status(201).send({shortUrl})
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getUrlbyId(req, res) {
    try {
        const urlObjById = await connectionWithDB.query(`SELECT id, url, "shortUrl" FROM urls WHERE "userId" = $1`, [req.params.id])

        if (urlObjById.rowCount === 0) {
            res.status(404).send("No url found for the respective id")
        }
        res.status(200).send(urlObjById.rows)
    }

    catch (err) {
        res.status(500).send(err.message)
    }

}

export async function redirectUser(req, res) {
    const shortUrl = `'${req.params.shortUrl}'`
   try {
        const urlToDirect = await connectionWithDB.query(`SELECT url, visits FROM urls WHERE "shortUrl" = $1`, [req.params.shortUrl])
        if (urlToDirect.rowCount === 0) {
            return res.sendStatus(404);
        }

         try {

            await connectionWithDB.query(`UPDATE urls SET visits = $2  WHERE "shortUrl" = $1`, [req.params.shortUrl, urlToDirect.rows[0].visits + 1])

        } catch (err) {
            res.status(500).send(err.message)
        }
 
        res.redirect(200,urlToDirect.rows[0].url)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function deleteUrl(req, res) {

    try {
        await connectionWithDB.query(`DELETE FROM urls WHERE id = $1`, [req.params.id])
    res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }

}