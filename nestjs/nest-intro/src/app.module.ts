import { Module } from '@nestjs/common';
import { UsuarioController } from './app.controller';
import { UsuarioService } from './app.service';
import { TelefonoController } from './telefono.controller';

@Module({
  imports: [],
  controllers: [UsuarioController, TelefonoController],
  providers: [UsuarioService],
})
export class AppModule {}
