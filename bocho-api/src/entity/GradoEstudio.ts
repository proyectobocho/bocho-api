import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()

export class GradoEstudio{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:30})
    descripcion:string;

    @OneToMany(()=>User, user=>user.grado)
    users:User[];
}