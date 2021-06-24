import { Router } from "express";
import PublicacionController from "../controller/PublicacionController";
import { checkJwt } from "../middlewares/jwt";


const router = Router();

//lista de todas las publicaciones publicas 
router.get('/list', [checkJwt], PublicacionController.getAll);

//lista de mis publicacion
router.get('/my-list',[checkJwt],PublicacionController.getMyPublications);

//obtener una publicacion personal
router.get('/find/:id',[checkJwt],PublicacionController.getById);

//nueva publicacion personal
router.post('/new', [checkJwt], PublicacionController.newPublicacion);

//editar publicacion
router.patch('/update/:id',[checkJwt], PublicacionController.editPublicacion);

//borrar publicacion
router.delete('/delete/:id',[checkJwt],PublicacionController.delete);

export default router;