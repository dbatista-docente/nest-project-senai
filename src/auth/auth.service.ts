// import { Injectable } from '@nestjs/common';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';

// @Injectable()
// export class AuthService {
//   constructor(private readonly usersService: UserService) {}

//   async validateUser(
//     email: string,
//     password: string,
//   ): Promise<{
//     id: string;
//     email: string;
//     name: string;
//     picture: string;
//     admin?: boolean;
//   } | null> {
//     const user: User = await this.usersService.findOne(email);
//     if (user && user.password === password) {
//       const { password, ...result } = user;
//       return result;
//     }
//     throw Error("Senha incorreta!");
//   }
// }

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password?: string,
    token?: number
  ): Promise<{
    id: string;
    email: string;
    name: string;
    picture: string;
    admin?: boolean;
  } | null> {
    const user: User = await this.usersService.findOne(undefined, email);
    console.log(user)
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    if((token == user.token) && user.token !== 0){
      const { password, ...result } = user;
      console.log("entrei aqui")
      return result;
    }

    throw Error(token ? "Token inválido ou expirado!" : "Senha incorreta!");
  }

  async login(user: User) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


