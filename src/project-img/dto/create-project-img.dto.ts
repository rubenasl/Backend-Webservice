import { IsArray, IsString } from "class-validator";
import { Project } from "src/project/entities/project.entity";
import { Usuario } from "src/usuario/entities/user.entity";

export class CreateProjectImgDto {

    id:number;
    @IsArray()
    @IsString({ each: true })
    imgs: string[];
    project_id:Project;
    user_id:Usuario;
}
