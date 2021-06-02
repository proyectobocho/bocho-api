import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Publicacion } from "../entity/Publicacion";

export class PublicacionController {

    static getAll = async (req: Request, res: Response) => {
        //const { userId } = res.locals.jwtPayload;
        //console.log("req: ",req.headers);
        //console.log("jwtPayload interno: ",res.locals)
        //console.log("userId: ",userId);
        const publicacionRepo = getRepository(Publicacion);
        let publicacion;

        try {
            /* publicacion = await publicacionRepo
                .find({
                    select: ["linkDoc", "contenido", "fecha"],
                    where: { privado: false }
                }); */

            publicacion = await publicacionRepo
                .createQueryBuilder("publicacion")
                .select(["publicacion.linkDoc", "publicacion.contenido", "publicacion.fecha", "User.nombre", "User.apellido", "User.email"])
                .innerJoin("publicacion.user", "User")
                .where("publicacion.privado=0")
                .orderBy("publicacion.fecha", "DESC")
                .getMany();

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }

        if (publicacion.length > 0) {
            return res.status(200).json({ publicacion })
        } else {
            return res.status(404).json({ message: "no hubo resultado" });
        }
    };

    static newPublicacion = async (req: Request, res: Response) => {

        //cambiar el nombre de la columna linkDoc por imagen
        const { userId } = res.locals.jwtPayload;
        const { contenido, linkDoc, privado } = req.body;
        const publicacion = new Publicacion();
        const fecha = new Date();
        let priv: boolean;
        if (privado == 'true') {
            priv = true;
        } else {
            priv = false
        }
        //console.log(priv);

        publicacion.linkDoc = linkDoc;
        publicacion.contenido = contenido;
        publicacion.privado = priv;
        publicacion.fecha = fecha;
        publicacion.user = userId;
        publicacion.modificado = fecha;

        const validationOpt = { validationError: { target: false, value: false } };

        const errors = await validate(publicacion, validationOpt);
        if (errors.length > 0) {
            let error = [];

            for (let i in errors) {
                for (let j in errors[i].constraints) {
                    error.push({
                        "message": errors[i].constraints[j],
                        "campo": errors[i].property
                    });
                }
            }
            //console.log(err);
            return res.status(400).json({ message: "hubo algunos errores", errors: error });
        }

        const publicacionRepo = getRepository(Publicacion);

        try {
            await publicacionRepo.save(publicacion);
        } catch (e) {
            console.log("e: ", e);
            return res.status(409).json({ message: "hubo algun error al publicar" })
        }
        res.status(200).json({ message: "publicacion realizada" });
    };

    static editPublicacion = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { id } = req.params;
        const { contenido, linkDoc, privado } = req.body;

        let publicacion;
        let priv: boolean;
        const publicacionRepo = getRepository(Publicacion);
        const fecha = new Date();

        try {
            publicacion = await publicacionRepo.findOneOrFail(id, { where: { user: userId } });

            if (privado == 'true') {
                priv = true;
            } else {
                priv = false;
            }
            publicacion.contenido = contenido;
            publicacion.linkDoc = linkDoc;
            publicacion.privado = priv;
            publicacion.modificado = fecha;

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no se encontro la publicacion" })
        }

        try {
            await publicacionRepo.save(publicacion)
        } catch (e) {
            return res.status(409).json({ message: "publicacion esta en uso" });
        }

        res.status(201).json({ message: "publicacion modificada" });
    }

    static delete = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { id } = req.params;

        const publicacionRepo = getRepository(Publicacion);
        let publicacion: Publicacion;

        try {
            publicacion = await publicacionRepo.findOneOrFail(id, { where: { user: userId } })
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "publicacion no encontrada" })
        }

        publicacionRepo.delete(id);
        return res.status(201).json({ message: "publicacion eliminada" });
    };
}

export default PublicacionController;