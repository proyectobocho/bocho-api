import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator"

export class UserController {

    static getAll = async (req: Request, res: Response) => {
        const userRepo = getRepository(User);
        let users;

        try {
            users = await userRepo.find();
        } catch (e) {
            return res.status(404).json({ message: "algo anda mal" });
        }

        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).json({ message: "no hubo resultado" });
        }

    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepo = getRepository(User);

        try {
            const user = await userRepo.findOneOrFail(id);
            res.send(user);
        } catch (e) {
            return res.status(404).json({ message: "no hubo resultado" });
        }
    };

    static newUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const user = new User();
        const fecha=new Date();

        user.username = username;
        user.password = password;
        user.creado=fecha;
        user.modificado=fecha;

        //validaciones
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        //falta hacer el hash para el password

        const userRepo = getRepository(User);

        try {
            await userRepo.save(user);
        } catch (e) {
            return res.status(409).json({ message: "el usuario ya existe" });
        }

        res.send("Usuario creado");
    };

    static editUser = async (req: Request, res: Response) => {

        let user;
        const { id } = req.params;

        const { username } = req.body;

        const userRepo = getRepository(User);
        const fecha=new Date();

        try {
            user = await userRepo.findOneOrFail(id);
            user.username = username;
            user.modificado=fecha;
        } catch (e) {
            return res.status(404).json({ message: "no se encontro el usuario" });
        }

        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await userRepo.save(user);
        } catch (e) {
            return res.status(409).json({ message: "usuario esta en uso" });
        }

        res.status(201).json({ message: "usuario modificado" });

    };

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepo = getRepository(User);
        let user: User;

        try {
            user = await userRepo.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: "usuario no encontrado" });
        }

        userRepo.delete(id);
        res.status(201).json({ message: "usuario eliminado" });
    };

}

export default UserController;