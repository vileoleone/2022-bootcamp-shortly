import { Router } from "express";
import { getUserMe } from "../controllers/users.controllers.js";
import { tokenValidation } from "../middlewares/users.middlewares.js";

const router = Router()

router.get("/users/me", tokenValidation, getUserMe)
 
export default router;