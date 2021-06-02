import { Router } from "express";
import PublicacionController from "../controller/PublicacionController";
import { checkJwt } from "../middlewares/jwt";


const router = Router();

//lista de publicaciones personales 
router.get('/list', [checkJwt], PublicacionController.getAll);
//nueva publicacion personal
router.post('/new', [checkJwt], PublicacionController.newPublicacion);
//editar publicacion
router.patch('/update/:id',[checkJwt], PublicacionController.editPublicacion);
//borrar publicacion
router.delete('/delete/:id',[checkJwt],PublicacionController.delete);

export default router;