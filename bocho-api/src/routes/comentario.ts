import { Router } from "express";
import ComentarioController from "../controller/ComentarioController";
import { checkJwt } from "../middlewares/jwt";

const router=Router();

//crear comentario
router.post('/new/:id',[checkJwt],ComentarioController.newComentario);

//obtener comentarios
router.get('/list/:id',[checkJwt],ComentarioController.getAll);
export default router;