import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Area{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;
}