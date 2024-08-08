import { PartialType } from '@nestjs/mapped-types';
import { CreateLenguajeDto } from './create-lenguaje.dto';

export class UpdateLenguajeDto extends PartialType(CreateLenguajeDto) {
    

    name:string
    level:string
}
