import { Router } from "express";
import { signupController } from "../controllers/signup.controllers.js";
import {signUpSchemaValidation } from "../middlewares/signup.middlewares.js";

const router = Router()

router.post("/signup", signUpSchemaValidation, signupController)

export default router;