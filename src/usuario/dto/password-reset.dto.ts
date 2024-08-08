import { IsNotEmpty, IsString } from "class-validator";

export class resetPassword{
    @IsNotEmpty()
    @IsString()
    username:string;
}