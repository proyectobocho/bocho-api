import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Publicacion } from "./Publicacion";
import { User } from "./User";

@Entity({name:"comentario"})

export class Comentario{
    @PrimaryGeneratedColumn()
    public id!:number;

    @Column()
    public userId!:number;

    @Column()
    public publicacionId!:number;

    @Column()
    public descripcion!:string;

    @ManyToOne(()=>User,user=>user.comentario)
    public user!:User;

    @ManyToOne(()=>Publicacion,publicacion=>publicacion.comentario)
    public publicacion!:Publicacion;
}