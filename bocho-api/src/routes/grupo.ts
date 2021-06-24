import { Router } from "express";
import GrupoController from "../controller/GrupoController";
import { checkJwt } from "../middlewares/jwt";


const router=Router();

//lista de todos los grupos
router.get('/list',[checkJwt],GrupoController.getAll);

//lista de grupos en los que soy miembro
router.get('/myList',[checkJwt],GrupoController.misGrupos)

//obtener un grupor segun id
router.get('/find/:id',[checkJwt],GrupoController.getById)

//nuevo grupo
router.post('/new',[checkJwt],GrupoController.new);

//editar
router.patch('/edit/:id',[checkJwt],GrupoController.edit);

//eliminar
router.delete('/delete/:id',[checkJwt],GrupoController.eliminar)

export default router;