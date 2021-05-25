import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comentario } from "./Comentario";
import { User } from "./User";

@Entity()

export class Publicacion{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: "blob"})
    @IsNotEmpty()
    contenido:string;

    @Column()
    linkDoc:string;

    @Column({type:"datetime"})
    fecha:Date;

    @Column({type:"boolean",default:false})
    privado:boolean;

    @ManyToOne(()=>User,user=>user.publicaciones)
    user:User;

    @OneToMany(()=>Comentario,comentario=>comentario.publicacion)
    public comentario!:Comentario[];
}