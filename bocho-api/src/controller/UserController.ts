import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator"

export class UserController {

    static getAll = async (req: Request, res: Response) => {
        const userRepo = getRepository(User);
        let users;

        try {
            //users = await userRepo.find({select:["email","nombre","apellido","fechaNacimiento"],relations:["grado"]});

            //de esta manera solamente selecciono ciertas columnas de la tabla grado_estudio o de la relacion GradoEstudio
            users = await userRepo
                .createQueryBuilder("user")
                .select(["user.email", "user.nombre", "user.apellido", "user.fechaNacimiento", "GradoEstudio.descripcion"])
                .innerJoin("user.grado", "GradoEstudio")
                .where("user.gradoId=GradoEstudio.id")
                .getMany();

        } catch (e) {
            console.log(e);
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
            //const user = await userRepo.findOneOrFail(id,{select:["email","nombre","apellido","fechaNacimiento"],relations:["grado"]});

            const user = await userRepo
                .createQueryBuilder("user")
                .select(["user.email", "user.nombre", "user.apellido", "user.fechaNacimiento", "GradoEstudio.descripcion"])
                .innerJoin("user.grado", "GradoEstudio")
                .where("user.gradoId=GradoEstudio.id")
                .andWhere("user.id = :id", { id: id })
                .getOneOrFail();

            res.send(user);
        } catch (e) {
            return res.status(404).json({ message: "no hubo resultado" });
        }
    };

    static editUser = async (req: Request, res: Response) => {

        let user;
        const { id } = req.params;
        const { nombre, apellido, email, nacimiento, grado } = req.body;

        const userRepo = getRepository(User);
        const fecha = new Date();

        try {
            user = await userRepo.findOneOrFail(id);
            user.nombre = nombre;
            user.apellido = apellido
            user.modificado = fecha;
            user.email = email;
            user.grado = grado;
            user.fechaNacimiento = nacimiento;
        } catch (e) {
            return res.status(404).json({ message: "no se encontro el usuario" });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
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