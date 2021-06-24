import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Grupo } from "./Grupo";
import { Publicacion } from "./Publicacion";
import { User } from "./User";


@Entity({name:"integrante"})

export class Integrante{
    @PrimaryGeneratedColumn()
    public id!:number;

    @Column()
    public grupoId!:number;

    @Column()
    public userId!:number;

    @Column()
    public rol!:string;

    @ManyToOne(()=>User,user=>user.integrante)
    public user!:User;

    @ManyToOne(()=> Grupo, grupo=>grupo.integrante)
    public grupo!:Grupo;

}