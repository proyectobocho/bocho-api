import {Router} from "express";
import { get } from "http";
import auth from "./auth";
import user from "./user";

const routes=Router();

routes.use('/auth',auth);
routes.use('/users',user);

export default routes;