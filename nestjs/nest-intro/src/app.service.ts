import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';



@Injectable()
export class UsuarioService {
  private users: User[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHelloService(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async postHelloService(newUser: User): Promise<string> {
    console.log('Nuevo usuario:', newUser);
    await this.usersRepository.save(newUser);
    console.log('usuarios', this.users);

    return 'Usuario agregado correctamente!  🤗';
  }

  deleteHelloService(idUser: number): string {
    const index = this.users.findIndex((user) => user.id === idUser);
    if (index !== -1) {
      this.users.splice(index, 1);
      return 'Usuario eliminado correctamente!';
    }
    return 'Usuario no encontrado!';
  }

  putHelloService(updateUser: User): string {
    const index = this.users.findIndex((user) => user.id === updateUser.id);
    if (index !== -1) {
      this.users[index] = updateUser;
      return 'Usuario actualizado correctamente!';
    }
    return 'Usuario no encontrado!';
  }
}
