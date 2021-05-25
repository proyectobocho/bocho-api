import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { GradoEstudio } from "../entity/GradoEstudio";


export class GradoEstudioController{

    static getAll= async (req:Request, res: Response)=>{
        const gradoRepo=getRepository(GradoEstudio);
        let grado;

        try {
            grado = await gradoRepo.find()
        } catch (e) {
            console.log(e);
            return res.status(404).json({message:"algo anda mal"});
        }

        if(grado.length>0){
            res.send(grado);
        }else{
            res.status(404).json({message:"no hubo resultados"});
        }
    }
}

export default GradoEstudioController;