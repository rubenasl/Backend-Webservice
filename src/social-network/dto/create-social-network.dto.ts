import { Usuario } from "src/usuario/entities/user.entity";

export class CreateSocialNetworkDto {




    id:number;
    name:string;

    link:string;
    user_id:Usuario;
    
}
