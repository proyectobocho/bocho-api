import { Router } from "express";
import GradoEstudioController from "../controller/GradoEstudioController";
import { checkJwt } from "../middlewares/jwt";


const router = Router();

//lista de grdo de estudio
router.get('/list', GradoEstudioController.getAll);

export default router;