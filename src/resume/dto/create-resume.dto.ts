import { Category } from "src/category/entities/category.entity";
import { Usuario } from "src/usuario/entities/user.entity";

export class CreateResumeDto {



    titleImpt:string;

    date_init:string;

    date_end:string;

    description:string;

    titleSecondary:string;

    link:string;

    country:string;

    city:string;
    

    subtitle:string;
    
    user_id:Usuario;
    category_id:Category

}
