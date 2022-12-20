import { connectionWithDB } from "../database/db.js"

export async function getUserMe(req, res) {
    const userId = res.locals.userId;
    
   
        
        try {
            const user = await connectionWithDB.query(`SELECT users.id, users.name FROM users WHERE id = $1`, [res.locals.userId])
            const urls = await connectionWithDB.query(`SELECT id, "shortUrl", url, visits FROM urls WHERE "userId" = $1`, [res.locals.userId])
            let visitCount = 0
            
            urls.rows.forEach((obj) => {
             visitCount+= obj.visits    
            })

            const getObj = [{
                id: user.rows[0].id,
                name: user.rows[0].name,
                visitCount,
                shortenedUrls: urls.rows
            }]

            res.send(getObj)
            
        } catch (err) {
            res.status(500).send(err.message)
        }
          

}

