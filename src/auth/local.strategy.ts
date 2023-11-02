import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<{
    id: string;
    email: string;
    name: string;
    picture: string;
    admin?: boolean;
}> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateTokenRecover(email: string, token: number): Promise<{
    id: string;
    email: string;
    name: string;
    picture: string;
    admin?: boolean;
}> {
    const user = await this.authService.validateUser(email,undefined, token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}