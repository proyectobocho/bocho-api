import { Router } from "express";
import IntegranteController from "../controller/IntegranteController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//obtener integrantes de un grupo
router.get('/list/:idGrupo', [checkJwt], IntegranteController.getAll);

//nuevo integrante de grupo
router.get('/new/:idGrupo', [checkJwt], IntegranteController.newIntegrante);

//desunirme del grupo
router.delete('/delete/:idGrupo',[checkJwt], IntegranteController.delete);

export default router;