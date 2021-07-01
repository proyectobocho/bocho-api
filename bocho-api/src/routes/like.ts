import { Router } from "express";
import LikeController from "../controller/LikeController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//like o dislike
router.get('/change/:id', [checkJwt], LikeController.likeDisLike);

//ver todos los likes
router.get('/list/:id', [checkJwt], LikeController.getAll)

export default router;