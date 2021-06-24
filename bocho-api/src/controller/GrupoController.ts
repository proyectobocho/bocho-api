import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Grupo } from "../entity/Grupo";
import { Integrante } from "../entity/Integrante";


export class GrupoController {

    static getAll = async (req: Request, res: Response) => {
        const grupoRepo = getRepository(Grupo);
        let grupos;
        try {
            grupos = await grupoRepo.find({ select: ["creacion", "descripcion", "id", "nombre", "foto"] })

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }
        if (grupos.length > 0) {
            return res.status(200).send(grupos);
        } else {
            return res.status(404).json({ message: "no se encontraron grupos" });
        }
    }

    static misGrupos = async (req: Request, res: Response) => {
        const integranteRepo = getRepository(Integrante);
        const { userId } = res.locals.jwtPayload;
        let grupos;
        try {
            grupos = await integranteRepo
                .createQueryBuilder("integrante")
                .select([
                    "integrante.id",
                    "grupo.id",
                    "grupo.nombre",
                    "grupo.foto"
                ])
                .innerJoin("integrante.grupo", "grupo")
                .where("integrante.user=:user", { user: userId })
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "hubo algunos problemas" });
        }
        return res.status(201).json(grupos);
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = res.locals.jwtPayload;
        //informacion del grupo
        const grupoRepo = getRepository(Grupo);
        let grupo;
        try {
            grupo = await grupoRepo
                .createQueryBuilder("grupo")
                .select([
                    "grupo.descripcion",
                    "grupo.creacion",
                    "grupo.id",
                    "grupo.foto",
                    "grupo.nombre",
                    "publicacion.linkDoc",
                    "publicacion.contenido",
                    "publicacion.fecha",
                    "publicacion.modificado",
                    "publicacion.id",
                    "publicacion.titulo",
                    "User.nombre",
                    "User.apellido",
                    "User.email",
                    "comentario.id",
                ])
                .leftJoin("grupo.publicaciones", "publicacion")
                .leftJoin("publicacion.user", "User")
                .leftJoin("publicacion.comentario", "comentario")
                .where("grupo.id=:id", { id: id })
                .orderBy("publicacion.modificado", "DESC")
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }

        //informacion de mi rol en este grupo
        const integranteRepo = getRepository(Integrante);
        let rol;
        try {
            rol = await integranteRepo
                .createQueryBuilder("integrante")
                .select("integrante.rol")
                .where("integrante.grupoId=:grupo", { grupo: id })
                .andWhere("integrante.userId=:user", { user: userId })
                .getOneOrFail();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 2" });
        }
        return res.status(200).json({ grupo, rol });
    }

    static new = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { descripcion, nombre, foto } = req.body;
        const fecha = new Date();

        const grupoRepo = getRepository(Grupo);
        let grupo;

        try {
            grupo = await grupoRepo
                .createQueryBuilder()
                .insert()
                .into(Grupo)
                .values([{
                    creacion: fecha,
                    descripcion: descripcion,
                    nombre: nombre,
                    foto: foto
                }])
                .execute();

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }

        let idGrupo = grupo.raw.insertId;

        const integranteRepo = getRepository(Integrante);
        let integrante;

        try {
            integrante = await integranteRepo
                .createQueryBuilder()
                .insert()
                .into(Integrante)
                .values([{
                    grupoId: idGrupo,
                    userId: userId,
                    rol: "admin"
                }])
                .execute();
        } catch (e) {
            console.log("e2: ", e);
            return res.status(404).json({ message: "algo anda mal 2" });
        }

        return res.status(200).json({ message: "se creo el grupo con exito" });
    }

    static edit = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload
        const { id } = req.params;
        const { descripcion, nombre, foto } = req.body;

        //obtengo mi rol en el grupo
        const integranteRepo = getRepository(Integrante);
        let rol;
        try {
            rol = await integranteRepo
                .createQueryBuilder("integrante")
                .select("integrante.rol")
                .where("integrante.grupoId=:grupo", { grupo: id })
                .andWhere("integrante.userId=:user", { user: userId })
                .getOneOrFail();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 2" });
        }

        if (rol.rol != "admin") {
            return res.status(401).json({ message: "no es admin del grupo" });
        }

        const grupoRepo = getRepository(Grupo);
        let grupo;

        try {
            grupo = await grupoRepo
                .createQueryBuilder()
                .update(Grupo)
                .set({
                    descripcion: descripcion,
                    foto: foto,
                    nombre: nombre,
                })
                .where("grupo.id =:grupo", { grupo: id })
                .execute();

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal" });
        }

        return res.status(200).json({ message: "grupo editado con exito" });
    }

    static eliminar = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload
        const { id } = req.params;

        const integranteRepo = getRepository(Integrante);
        let rol;
        try {
            rol = await integranteRepo
                .createQueryBuilder("integrante")
                .select("integrante.rol")
                .where("integrante.grupoId=:grupo", { grupo: id })
                .andWhere("integrante.userId=:user", { user: userId })
                .getOneOrFail();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }

        if (rol.rol != "admin") {
            return res.status(401).json({ message: "no es admin del grupo" });
        }

        let borrado;
        try {
            borrado = await integranteRepo
                .createQueryBuilder()
                .delete()
                .from(Integrante)
                .where("integrante.grupoId=:grupo", { grupo: id })
                .execute();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo salio mal" });
        }

        const grupoRepo = getRepository(Grupo);
        let grupo;
        try {
            grupo = await grupoRepo
                .createQueryBuilder()
                .delete()
                .from(Grupo)
                .where("grupo.id=:id", { id: id })
                .execute();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 2" });
        }

        return res.status(200).json({ message: "grupo borrado" });
    }

}

export default GrupoController;