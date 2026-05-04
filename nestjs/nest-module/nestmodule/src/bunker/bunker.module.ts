import { Module } from '@nestjs/common';
import { BunkerService } from './bunker.service';
import { BunkerController } from './bunker.controller';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  imports: [DepartamentoModule],
  controllers: [BunkerController],
  providers: [BunkerService],
})
export class BunkerModule {}
