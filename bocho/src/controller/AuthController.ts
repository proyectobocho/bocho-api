import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {User} from '../entity/User';

class AuthController{
    static login =async (req:Request,res:Response)=>{
        const {username,password}=req.body;

        if(!(username && password)){
            return res.status(400).json({message: "Usuario y/o contraseña son requeridos"});
        }

        const userRepo=getRepository(User);
        let user:User;

        try {
            user=await userRepo.findOneOrFail({where:{username:username}});
        } catch (e) {
            return res.status(400).json({message: "Usuario y/o contraseña incorrectos"});
        }

        res.send(user.username+" esta logueado");
    };
}

export default AuthController;