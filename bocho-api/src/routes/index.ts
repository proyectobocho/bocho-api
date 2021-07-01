import { Router } from "express";
import auth from "../routes/auth";
import user from "../routes/user";
import grado from "../routes/gradoEstudio";
import publicacion from "../routes/publicacion";
import comentario from "../routes/comentario";
import grupo from "../routes/grupo";
import integrante from "../routes/integrante";
import like from "../routes/like";

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/grado-estudio', grado);
routes.use('/publicacion', publicacion);
routes.use('/comentario', comentario);
routes.use('/grupo', grupo);
routes.use('/integrante', integrante);
routes.use('/like', like);

export default routes;