import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectImgDto } from './create-project-img.dto';

export class UpdateProjectImgDto extends PartialType(CreateProjectImgDto) {}
