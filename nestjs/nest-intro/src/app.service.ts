import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Animal } from './entities/animal.entity';

@Injectable()
export class UsuarioService {
  private users: User[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Animal)
    private readonly animalsRepository: Repository<Animal>
  ) {}

  // @InjectedRepository(<NombreEntidad>) private readonly Repository: Repository<NombreEntidad>

// SELECT * FROM users;
// this.usersRepository.find()


// INSERT INTO users (name, age) VALUES ('Alice', 28);
// this.usersRepository.save(newUser)

// DELETE FROM users WHERE id = 1;
// this.usersRepository.delete(idUser)

// UPDATE users SET name = 'Alice', age = 28 WHERE id = 1;
// this.usersRepository.update(updateUser.id, updateUser)


  test(): void {
    this.usersRepository.
  }

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
