import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {


  getHelloService(): string {
    return 'Hello World DESDE SERVICE!';
  }

  postHelloService(): string {
    return 'Hola POST DESDE SERVICE!';
  }

  deleteHelloService(): string {
    return 'Adios DELETE DESDE SERVICE!';
  }
  
  putHelloService(): string {
    return 'Hola de nuevo PUT DESDE SERVICE!';
  }

}
