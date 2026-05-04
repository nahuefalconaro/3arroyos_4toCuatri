import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BunkerService } from './bunker.service';
import { CreateBunkerDto } from './dto/create-bunker.dto';
import { UpdateBunkerDto } from './dto/update-bunker.dto';

@Controller('bunker')
export class BunkerController {
  constructor(private readonly bunkerService: BunkerService) {}

  @Post()
  create(@Body() createBunkerDto: CreateBunkerDto) {
    return this.bunkerService.create(createBunkerDto);
  }

  @Get()
  findAll() {
    return this.bunkerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bunkerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBunkerDto: UpdateBunkerDto) {
    return this.bunkerService.update(+id, updateBunkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bunkerService.remove(+id);
  }
}
