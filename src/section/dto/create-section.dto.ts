import { Usuario } from "src/usuario/entities/user.entity";

export class CreateSectionDto {


    id:number;

    title:string;


    description:string;
    user_id:Usuario;
}
