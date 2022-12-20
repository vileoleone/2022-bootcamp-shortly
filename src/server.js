import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import signinRoutes from "./routes/signIn.routes.js"
import signupRoutes from "./routes/signup.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
import usersRoutes from "./routes/users.routes.js"
import rankingsRoutes from "./routes/rankings.routes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use(signinRoutes);
app.use(signupRoutes);
app.use(urlsRoutes);
app.use(usersRoutes);
app.use(rankingsRoutes);

const port = process.env.port || 4000

app.listen(port, () => console.log(`server running in port ${port}`))