import { Router } from "express";
import { deleteUrl, getUrlbyId, redirectUser, urlShortenController } from "../controllers/urls.controllers.js";
import { filterUserIdUrls, tokenValidation, UrlBodyValidation } from "../middlewares/urls.middlewares.js";

const router = Router()

router.post("/urls/shorten", tokenValidation, UrlBodyValidation, urlShortenController)
router.get("/urls/:id", getUrlbyId)
router.get("/urls/open/:shortUrl", redirectUser)
router.delete("/urls/:id", tokenValidation, filterUserIdUrls, deleteUrl)
export default router;