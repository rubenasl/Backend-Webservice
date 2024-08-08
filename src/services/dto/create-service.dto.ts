import { Usuario } from "src/usuario/entities/user.entity";

export class CreateServiceDto {



    id:number;

    name:string;


    description:string;
    user_id:Usuario;
    icon: string;
}
