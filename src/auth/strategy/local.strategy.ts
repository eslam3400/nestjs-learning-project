import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: 'secretKey',
    });
  }

  async validate(username: string, password: string): Promise<User | null> {
    const loginDto: LoginDto = { username, password };
    const user = await this.authService.validateUser(loginDto);
    return user;
  }
}
