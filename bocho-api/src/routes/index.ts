import { Router } from "express";
import auth from "./auth";
import user from "./user";
import grado from "./gradoEstudio";
import publicacion from "./publicacion"

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/grado-estudio', grado);
routes.use('/publicacion', publicacion);

export default routes;