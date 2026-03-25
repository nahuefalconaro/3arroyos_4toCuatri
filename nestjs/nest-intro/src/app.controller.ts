import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsuarioService } from './app.service';

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
  getHelloController(): string {
    return this.usuarioService.getHelloService();
  }

  @Post()//agregar
  postHelloController(): string {
    return this.usuarioService.postHelloService();
  }

  @Delete()//eliminar
  deleteHelloController(): string {
    return this.usuarioService.deleteHelloService();
  }

  @Put()//modificar
  putHelloController(): string {
    return this.usuarioService.putHelloService();
  }
}
