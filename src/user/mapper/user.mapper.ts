import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserMapper {
  mapToGetUserDto(user: User): GetUserDto {
    const dto: GetUserDto = new GetUserDto();
    dto.username = user.username;
    dto.password = user.password;
    return dto;
  }

  mapFromCreateUserDto(dto: CreateUserDto): User {
    const user: User = new User();
    user.username = dto.username;
    user.password = dto.password;
    return user;
  }

  mapFromUpdateUserDto(dto: UpdateUserDto): User {
    const user: User = new User();
    user.username = dto.username;
    user.password = dto.password;
    return user;
  }
}
