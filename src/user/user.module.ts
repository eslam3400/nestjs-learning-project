import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './entity/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserMapper],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
