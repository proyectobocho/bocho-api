import {Router} from "express";
import {UserController} from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";

const router=Router();

//get all users
router.get('/list',[checkJwt],UserController.getAll);

//get by id
router.get('/find/:id',[checkJwt],UserController.getById);

//edit user
router.patch('/edit/:id',UserController.editUser);

//delete user
router.delete('/delete/:id',UserController.deleteUser);


export default router;


