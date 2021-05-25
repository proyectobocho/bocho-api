import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt"

const router = Router();

//login
router.post('/login', AuthController.login);
//change password
router.post('/change-password', [checkJwt], AuthController.changePassword);
//new user
router.post('/register', AuthController.newUser);

export default router;