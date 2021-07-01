import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Like } from "../entity/Like";

export class LikeController {

    static likeDisLike = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { id } = req.params;

        const likeRepo = getRepository(Like);

        let like;
        try {
            like = await likeRepo
                .createQueryBuilder("like")
                .select([
                    "like.id",
                    "publicacion.id",
                    "user.id"
                ])
                .innerJoin("like.user", "user")
                .innerJoin("like.publicacion", "publicacion")
                .where("like.user=:user", { user: userId })
                .andWhere("like.publicacion=:post", { post: id })
                .getOneOrFail();
        } catch (e) {
            console.log("e: ", e)
        }
        console.log(like);
        if (like != undefined) {
            try {
                await likeRepo
                    .createQueryBuilder()
                    .delete()
                    .from(Like)
                    .where("like.publicacionId=:id", { id: id })
                    .andWhere("like.userId=:user", { user: userId })
                    .execute();
            } catch (e) {
                console.log("e: ", e);
                return res.status(400).json({ message: "algo anda mal 1" });
            }
            return res.status(200).json({ message: "dislike >:V" });

        } else {
            try {
                await likeRepo
                    .createQueryBuilder()
                    .insert()
                    .into(Like)
                    .values([{
                        flag: true,
                        userId: userId,
                        publicacionId: parseInt(id)
                    }])
                    .execute();
            } catch (e) {
                console.log("e: ", e);
                return res.status(400).json({ message: "algo anda mal 2" });
            }
            return res.status(200).json({ message: "like :)" });
        }
    }

    static getAll = async (req: Request, res: Response) => {
        const { id } = req.params;

        const likeRepo = getRepository(Like);
        let likes;
        try {
            likes = await likeRepo
                .createQueryBuilder("like")
                .select([
                    "like.id",
                    //"publicacion.id",
                    "user.nombre",
                    "user.apellido",
                    "user.id"
                ])
                //.innerJoin("like.publicacion", "publicacion")
                .innerJoin("like.user", "user")
                .where("like.publicacion=:id", { id: id })
                .getMany();
        } catch (e) {
            console.log("e: ", e);
            return res.status(404).json({ message: "algo anda mal" });
        }

        return res.status(200).json(likes);
    }
}

export default LikeController;