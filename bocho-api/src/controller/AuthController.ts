import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import * as jwt from "jsonwebtoken"
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController {
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ message: "Usuario y/o contraseña son requeridos" });
        }

        const userRepo = getRepository(User);
        let user: User;

        try {
            user = await userRepo.findOneOrFail({ where: { email: email } }); 
        } catch (e) {
            return res.status(400).json({ message: "Usuario y/o contraseña incorrectos" });
        }

        if (!user.cheakPassword(password)) {
            return res.status(400).json({ message: "Usuario y/o contraseña incorrecto" })
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: "1h" });

        res.json({ message: "ok", token: token, userId: user.id, user: { email: user.email, nombre: user.nombre, apellido: user.apellido } });
    };

    static newUser = async (req: Request, res: Response) => {
        const { nombre, apellido, password, email, nacimiento, grado } = req.body;

        const user = new User();
        const fecha = new Date();

        user.nombre = nombre;
        user.apellido = apellido;
        user.password = password;
        user.creado = fecha;
        user.modificado = fecha;
        user.email = email;
        user.fechaNacimiento = nacimiento;
        user.grado = grado;

        //validaciones
        const validationOpt = { validationError: { target: false, value: false } };

        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {

            let err = [];

            for (let i in errors) {
                for (let j in errors[i].constraints) {
                    err.push({
                        "message": errors[i].constraints[j],
                        "campo":errors[i].property
                    });
                }
            }
            //console.log(err);
            return res.status(400).json({ message: err });
        }

        const userRepo = getRepository(User);

        try {
            user.hashPassword();
            await userRepo.save(user);
        } catch (e) {
            //console.log(e);
            return res.status(409).json({ message: "el usuario ya existe" });
        }

        res.status(200).json({ message: "usuario creado" });
    };

    static changePassword = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;

        if (!(oldPassword && newPassword)) {
            res.status(400).json({ message: "nueva y/o antigua contraseña son requeridos" });
        }

        const userRepo = getRepository(User);
        let user: User;

        try {
            user = await userRepo.findOneOrFail(userId);
        } catch (e) {
            res.status(400).json({ message: "algo anda mal :V" });
        }

        if (!user.cheakPassword(oldPassword)) {
            res.status(401).json({ message: "revise su actual contraseña" });
        }

        user.password = newPassword;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        //hash password

        user.hashPassword();
        userRepo.save(user);

        res.json({ message: "Contraseña cambiada" });
    };

}

export default AuthController;