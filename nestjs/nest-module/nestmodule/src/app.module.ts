import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { EdificioModule } from './edificio/edificio.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { BunkerModule } from './bunker/bunker.module';

@Module({
  imports: [UserModule, EdificioModule, DepartamentoModule, CiudadModule, BunkerModule]})
export class AppModule {}
