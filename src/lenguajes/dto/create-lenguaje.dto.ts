import { Usuario } from "src/usuario/entities/user.entity"

export class CreateLenguajeDto {

    name:string
    level:string
    user_id:Usuario
}
