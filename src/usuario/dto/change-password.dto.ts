import { IsNotEmpty } from "class-validator"

export class changePasswordDto{
    
    @IsNotEmpty()
    old_pass:string;

    @IsNotEmpty()
    new_pass:string;
}