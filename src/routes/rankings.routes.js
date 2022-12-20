import { Router } from "express";
import { rankingUrls } from "../controllers/rankings.controllers.js";

const router = Router()

router.get("/ranking", rankingUrls)

export default router;