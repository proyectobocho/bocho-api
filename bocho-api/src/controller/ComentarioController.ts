import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comentario } from "../entity/Comentario";

export class ComentarioController {

    static newComentario = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { descripcion } = req.body;
        const { id } = req.params

        const fecha = new Date();
        const comentarioRepo = getRepository(Comentario);
        let comentario;
        try {
            comentario = await comentarioRepo
                .createQueryBuilder()
                .insert()
                .into(Comentario)
                .values([{
                    userId: userId,
                    publicacionId: parseInt(id),
                    descripcion: descripcion,
                    fecha: fecha
                }])
                .execute();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal" });
        }
        //console.log("algo: ", comentario.raw.insertId); //esto obtine el insertId;
        return res.status(200).json({ message: "se creo el comentario" });
    }

    static getAll = async (req: Request, res: Response) => {
        const { id } = req.params;

        const comentarioRepo = getRepository(Comentario);
        let comentarios;

        try {
            comentarios = await comentarioRepo
                .createQueryBuilder("comentario")
                .select([
                    "comentario.descripcion",
                    "comentario.fecha",
                    "user.nombre",
                    "user.apellido"
                ])
                .innerJoin("comentario.user", "user")
                .where("comentario.publicacion=:id", { id: id })
                .orderBy("comentario.fecha", "DESC")
                .getMany()

        } catch (e) {
            console.log("e: ", e);
        }

        return res.status(200).send(comentarios);
    }
}

export default ComentarioController;