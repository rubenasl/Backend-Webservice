import { IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    username:string;
    
    @IsNotEmpty()
    password:string;

    firstName:string;

    lastName:string;


    phone:string;

    @IsOptional()
    @IsString()
    birthday: string | null;

    address:string;

    degree:string;

    freelancer:string;

    remote:string;

    profession:string;


    level:string

    experience:string;

    @IsOptional()
    cvPathEs: string;

    @IsOptional()
    cvPathEn: string;
}
