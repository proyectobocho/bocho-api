import { Request, Response } from "express"
import { createQueryBuilder, getRepository, In } from "typeorm";
import { Grupo } from "../entity/Grupo";
import { Integrante } from "../entity/Integrante";


export class IntegranteController {

    static getAll = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { idGrupo } = req.params;
        const integranteRepo = getRepository(Integrante);

        //en este primer try-catch evaluo si el user logeado es admin del grupo
        let admin;
        try {
            admin = await integranteRepo
                .createQueryBuilder("integrante")
                .select(["integrante"])
                .innerJoin("integrante.grupo", "grupo")
                .where("integrante.grupo=:ig", { ig: idGrupo })
                .andWhere("integrante.user=:id", { id: userId })
                .andWhere("integrante.rol=:rol", { rol: 'admin' })
                .getOneOrFail();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "no es admin del grupo" });
        }

        let integrantes;
        try {
            integrantes = await integranteRepo
                .createQueryBuilder("integrante")
                .select([
                    "integrante.rol",
                    "user.nombre",
                    "user.apellido",
                    "user.email"
                ])
                .innerJoin("integrante.user", "user")
                .where("integrante.grupoId=:id", { id: idGrupo })
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal" });
        }

        if (integrantes.length > 0) {
            return res.status(200).send(integrantes);
        } else {
            return res.status(404).json({ message: "no hay integrantes / grupo" })
        }

    }

    static newIntegrante = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { idGrupo } = req.params;

        const integranteRepo = getRepository(Integrante);
        //parece que si valida, ojo testear a fondo mas adelante
        let miembro;
        try {
            miembro = await integranteRepo
                .createQueryBuilder("integrante")
                .select()
                .innerJoin("integrante.grupo", "grupo")
                .where("integrante.user=:user", { user: userId })
                .andWhere("grupo.id=:grupo", { grupo: idGrupo })
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" })
        }

        if (miembro.length > 0) {
            return res.status(404).json({ message: "usted esta en este grupo" })
        }

        let integrante;
        try {

            integrante = await integranteRepo
                .createQueryBuilder()
                .insert()
                .into(Integrante)
                .values([{
                    userId: userId,
                    grupoId: parseInt(idGrupo),
                    rol: "member"
                }])
                .execute();

        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal 1" });
        }

        return res.status(200).json({ message: "se ha unido al grupo" });
    }

    static delete = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { idGrupo } = req.params;

        const integranteRepo = getRepository(Integrante);
        let borrado;
        try {
            borrado = await integranteRepo
                .createQueryBuilder()
                .delete()
                .from(Integrante)
                .where("integrante.userId=:user", { user: userId })
                .andWhere("integrante.grupoId=:grupo", { grupo: idGrupo })
                .execute();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo salio mal" });
        }
        console.log("borrado", borrado);
        return res.status(200).json({ message: "salio del grupo" });
    }
}

export default IntegranteController