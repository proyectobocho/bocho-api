import { MinLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:30})
    @MinLength(6)
    username: string;

    @Column({length:15})
    @MinLength(8)
    password: string;

    @Column({type:"datetime"})
    creado:Date;

    @Column({type:"datetime"})
    modificado:Date;
}
