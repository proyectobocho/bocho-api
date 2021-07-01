import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Publicacion } from "./Publicacion";
import { User } from "./User";

@Entity('like')

export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public userId!: number;

    @Column()
    public publicacionId!: number;

    @Column({ type: "boolean" })
    public flag!: boolean;

    @ManyToOne(()=>User,user=>user.like)
    public user!:User;

    @ManyToOne(()=>Publicacion, publicacion=>publicacion.like)
    public publicacion!:Publicacion;
}