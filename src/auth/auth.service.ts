import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { ResultDto } from 'src/models/result';
import { Token } from './types/token.type';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // check if fields uniq and throw user friendly error if not
    await this.checkUniqFields(registerDto.username, registerDto.email);
    // hash password
    const salt = await genSalt();
    registerDto.password = await hash(registerDto.password, salt);
    const saveResult = await this.userRepository.save({
      ...registerDto,
      salt,
    });
    if (!saveResult) throw new BadRequestException();
    const result = new ResultDto();
    result.message = 'User created successfully';
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (!user) throw new NotFoundException();
    const isPasswordMatch = await compare(loginDto.password, user.password);
    if (!isPasswordMatch) throw new NotFoundException();
    return this.generateToken(user);
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async checkUniqFields(username: string, email: string) {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (user) throw new BadRequestException('username or email is used before');
  }

  async checkUniqField(field: string, value: string) {
    const user = await this.userRepository.findOne({
      where: { [field]: value },
    });
    if (user) throw new BadRequestException(`${field} is already used`);
  }

  async generateToken(user: User) {
    const access_token = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });
    const result = new ResultDto<Token>();
    result.data = { access_token };
    return result;
  }
}
