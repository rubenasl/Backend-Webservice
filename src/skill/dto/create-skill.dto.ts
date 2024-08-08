import { Usuario } from "src/usuario/entities/user.entity";

export class CreateSkillDto {


    id:number;
    porcent:string;
    icon: string;
    user_id:Usuario;
    group:string;
    name:string;
}
