import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsuarioService } from './app.service';

// http://localhost:3000/telefonos

// useEffect(() => {
//     fetch('http://localhost:3000/telefonos',{
//       method: 'POST'
//     })
//     .then(response => response.json())
//     .then(data =>console.log(data))
//     .catch(error => console.error(error));
// }, []);


// Controller 1(cada decorador, creacion de metodos, buenas practicas, dto, validaciones)
// Controller 2(pipes, middlewares, guards, interceptors, filters) -> Opcionales)
// module
// comandos nest

// luego de la clase de controller, ejercicio de practica completo.
@Controller('/telefonos')
export class TelefonoController {
  constructor() {
  }

  @Get()//obtener
  getHelloController(): string {
    return 'TELEFONO: Hello World DESDE CONTROLLER!';
  }

  @Post()//agregar
  postHelloController(): string {
    return 'TELEFONO: Hola POST DESDE CONTROLLER!';
  }

  @Delete()//eliminar
  deleteHelloController(): string {
    return 'TELEFONO: Adios DELETE DESDE CONTROLLER!';
  }

  @Put()//modificar
  putHelloController(): string {
    return 'TELEFONO: Hola de nuevo PUT DESDE CONTROLLER!';
  }
}
