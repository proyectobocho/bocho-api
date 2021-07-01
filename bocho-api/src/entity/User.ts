import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToMany } from "typeorm";
import { IsDate, IsEmail, IsNotEmpty, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";
import * as bcrypt from "bcryptjs"
import { GradoEstudio } from "./GradoEstudio";
import { Publicacion } from "./Publicacion";
import { Comentario } from "./Comentario";
import { Integrante } from "./Integrante";
import { Like } from "./Like";

@Entity()
//@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    @Matches(/^([a-zA-Z]|[\'\ñ\Ñ]?)*$/)
    nombre: string;

    @Column({ length: 30 })
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    @Matches(/^([a-zA-Z]|[\'\ñ\Ñ]?)*$/)
    apellido: string;

    @Column({ length: 30, unique: true })
    @IsEmail()
    @MinLength(5)
    @MaxLength(30)
    @IsNotEmpty()
    @Matches(/\S+@\S+\.\S+/)
    email: string;

    @Column()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @Column({ type: "datetime" })
    creado: Date;

    @Column({ type: "datetime" })
    modificado: Date;

    @Column({ type: "date" })
    @IsNotEmpty()
    @IsDate()
    @MaxDate(new Date)
    fechaNacimiento: Date;

    @ManyToOne(() => GradoEstudio, grado => grado.users)
    @IsNotEmpty()
    grado: GradoEstudio;

    @OneToMany(() => Publicacion, publicacion => publicacion.user)
    publicaciones: Publicacion[];

    @OneToMany(() => Comentario, comentario => comentario.user)
    public comentario!: Comentario[];

    @OneToMany(() => Integrante, integrante => integrante.user)
    public integrante!: Integrante[];

    @OneToMany(() => Like, like => like.user)
    public like!: Like[];

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    cheakPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }

}
