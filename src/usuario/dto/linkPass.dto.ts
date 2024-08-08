import { IsNotEmpty, IsUUID } from "class-validator"

export class linkPassDto{
    
    @IsNotEmpty()
    @IsUUID('4')
    resetPasswordToken:string
    @IsNotEmpty()
    password:string
}