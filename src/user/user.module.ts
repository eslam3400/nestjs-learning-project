import { Module } from '@nestjs/common';
import { UserMapper } from './mapper/user.mapper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserMapper],
})
export class UserModule { }
