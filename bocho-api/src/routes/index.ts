import { Router } from "express";
import auth from "./auth";
import user from "./user";
import grado from "./gradoEstudio";
import publicacion from "./publicacion";
import comentario from "./comentario";
import grupo from "./grupo";
import integrante from "./integrante"

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/grado-estudio', grado);
routes.use('/publicacion', publicacion);
routes.use('/comentario', comentario);
routes.use('/grupo', grupo);
routes.use('/integrante', integrante)

export default routes;