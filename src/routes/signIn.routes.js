import { Router } from "express";
import { signInController } from "../controllers/signin.controllers.js";
import { signInBodyValidation } from "../middlewares/signin.middlewares.js";

const router = Router()

router.post("/signin", signInBodyValidation, signInController)

export default router;