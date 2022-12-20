import { connectionWithDB } from "../database/db.js"

export async function rankingUrls (req, res) {
    try {
        const ranking = await connectionWithDB.query(`SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls.visits) AS "visitCount" FROM users JOIN Urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`)

        res.status(200).send(ranking.rows)
        
    } catch (err) {
       res.status(500).send(err.message) 
    }
}

