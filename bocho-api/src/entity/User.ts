import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany } from "typeorm";
import { isDate, IsEmail, IsNotEmpty, isNotEmpty, MinLength } from "class-validator";
import * as bcrypt from "bcryptjs"
import { GradoEstudio } from "./GradoEstudio";
import { Publicacion } from "./Publicacion";
import { Comentario } from "./Comentario";

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    @MinLength(3)
    @IsNotEmpty()
    nombre: string;

    @Column({ length: 30 })
    @MinLength(3)
    @IsNotEmpty()
    apellido: string;

    @Column({length:30})
    @IsEmail()
    @MinLength(9)
    @IsNotEmpty()
    email:string;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @Column({ type: "datetime" })
    creado: Date;

    @Column({ type: "datetime" })
    modificado: Date;

    @Column({type:"date"})
    @IsNotEmpty()
    fechaNacimiento:Date;

    @ManyToOne(()=>GradoEstudio,grado=>grado.users)
    @IsNotEmpty()
    grado:GradoEstudio;

    @OneToMany(()=>Publicacion,publicacion=>publicacion.user)
    publicaciones:Publicacion[];

    @OneToMany(()=>Comentario,comentario=>comentario.user)
    public comentario!:Comentario[];

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    cheakPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }
}
