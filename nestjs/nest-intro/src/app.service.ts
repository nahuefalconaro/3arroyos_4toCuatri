import { Injectable } from '@nestjs/common';
import { User } from './interfaces/User.interface';


@Injectable()
export class UsuarioService {

  private users: User[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ];


  getHelloService(): User[] {
    return this.users;
  }

  postHelloService(newUser: User): string {
    console.log("Nuevo usuario:", newUser);
    
    this.users.push(newUser);
    console.log("usuarios", this.users);
    
    return 'Usuario agregado correctamente!  🤗';
  }

  deleteHelloService(idUser: number): string {
    const index = this.users.findIndex(user => user.id === idUser);
    if (index !== -1) {
      this.users.splice(index, 1);
      return 'Usuario eliminado correctamente!';
    }
    return 'Usuario no encontrado!';
  }
  
  putHelloService(updateUser: User): string {
    const index = this.users.findIndex(user => user.id === updateUser.id);
    if (index !== -1) {
      this.users[index] = updateUser;
      return 'Usuario actualizado correctamente!';
    }
    return 'Usuario no encontrado!';
  }

}
