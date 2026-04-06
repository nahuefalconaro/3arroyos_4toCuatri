import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './app.controller';
import { UsuarioService } from './app.service';
import { User } from './entities/user.entity';
import { TelefonoController } from './telefono.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tresa',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsuarioController, TelefonoController],
  providers: [UsuarioService],
})
export class AppModule {}
