import pkg from "pg"
import dotenv from "dotenv"

dotenv.config();

const { Pool } = pkg;

export const connectionWithDB = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: true,
})

//https://api-shortly-sql-vd5c.onrender.com -- banco do render