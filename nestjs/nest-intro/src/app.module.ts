import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './app.controller';
import { UsuarioService } from './app.service';
import { User } from './user/entities/user.entity';
import { TelefonoController } from './telefono.controller';
import { Animal } from './entities/animal.entity';
import { OficioController } from './oficio.controller';
import { OficioService } from './oficio.service';
import { PacienteController } from './paciente.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tresa',
      entities: [User, Animal],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Animal]),
  ],
  controllers: [UsuarioController, TelefonoController, OficioController, PacienteController],
  providers: [UsuarioService, OficioService],
})
export class AppModule {}
