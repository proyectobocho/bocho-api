import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comentario } from "./Comentario";
import { Grupo } from "./Grupo";
import { User } from "./User";

@Entity()
//agregar validaciones con class-validator
export class Publicacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    @IsNotEmpty()
    contenido: string;

    @Column()
    titulo: string;

    @Column()
    linkDoc: string;

    @Column({ type: "datetime" })
    fecha: Date;

    @Column({ type: "datetime", default: null })
    modificado: Date;

    @Column({ type: "boolean" })
    privado: boolean;

    @ManyToOne(() => User, user => user.publicaciones, { nullable: false })
    user: User;

    @OneToMany(() => Comentario, comentario => comentario.publicacion)
    public comentario!: Comentario[];

    @ManyToOne(() => Grupo, grupo => grupo.publicaciones)
    grupo: Grupo;
}