import { Injectable } from '@nestjs/common';
import { CreateBunkerDto } from './dto/create-bunker.dto';
import { UpdateBunkerDto } from './dto/update-bunker.dto';

@Injectable()
export class BunkerService {
  create(createBunkerDto: CreateBunkerDto) {
    return 'This action adds a new bunker';
  }

  findAll() {
    return `This action returns all bunker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bunker`;
  }

  update(id: number, updateBunkerDto: UpdateBunkerDto) {
    return `This action updates a #${id} bunker`;
  }

  remove(id: number) {
    return `This action removes a #${id} bunker`;
  }
}
