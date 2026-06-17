import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './createApplication.dto';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
