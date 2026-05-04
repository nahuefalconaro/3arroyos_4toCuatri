import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsuarioService } from './app.service';
import type { User } from './user/entities/user.entity';

// http://localhost:3000/usuarios

// useEffect(() => {
//     fetch('http://localhost:3000/usuarios',{
//       method: 'POST'
//     })
//     .then(response => response.json())
//     .then(data =>console.log(data))
//     .catch(error => console.error(error));
// }, []);


@Controller('/usuarios')
export class UsuarioController {
  
  private readonly usuarioService: UsuarioService;

  constructor(usuarioService: UsuarioService) {
    this.usuarioService = usuarioService;
  }

  @Get()//obtener
  getHelloController(): Promise<User[]> {
    return this.usuarioService.getHelloService();
  }

  @Post()//agregar
  postHelloController(@Body() newUser: User): Promise<string> {
    return this.usuarioService.postHelloService(newUser);
  }

  @Delete()//eliminar
  deleteHelloController(idUser: number): string {
    return this.usuarioService.deleteHelloService(idUser);
  }

  @Put()//modificar
  putHelloController(updateUser: User): string {
    return this.usuarioService.putHelloService(updateUser);
  }
}
