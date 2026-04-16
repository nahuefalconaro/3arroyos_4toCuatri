import { PartialType } from '@nestjs/mapped-types';
import { CreateBunkerDto } from './create-bunker.dto';

export class UpdateBunkerDto extends PartialType(CreateBunkerDto) {}
