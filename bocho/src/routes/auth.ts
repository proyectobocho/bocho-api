import {Router} from "express";
import AuthController from "../controller/AuthController";

const router =Router();

//login
router.post('/login',AuthController.login);

export default router;