import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Integrante } from "./Integrante";
import { Publicacion } from "./Publicacion";


@Entity()
//@Unique(['nombre'])
export class Grupo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column({ type: "datetime" })
    creacion: Date;

    @Column()
    nombre:string;

    @Column()
    foto:string;

    @OneToMany(()=>Publicacion,publicacion=>publicacion.grupo)
    publicaciones:Publicacion[];

    @OneToMany(()=>Integrante,integrante=>integrante.grupo)
    public integrante!:Integrante[];
}