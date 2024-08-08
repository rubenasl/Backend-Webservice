import { Usuario } from "src/usuario/entities/user.entity";

export class CreatePhotoDto {





    id:number;
    section:string;
    imgs: string;
    user_id:Usuario;
}
