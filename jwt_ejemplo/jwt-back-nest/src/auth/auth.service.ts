import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(usern: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(usern);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    // const { username, id } = user;
    // instead of the user object
    // return { username, id };
  }
}
