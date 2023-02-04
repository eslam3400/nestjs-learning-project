import { Injectable } from '@nestjs/common';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserMapper {
  mapUserToGetUserDto(user: User): GetUserDto {
    const getUserDto = new GetUserDto();
    getUserDto.id = user.id;
    getUserDto.username = user.username;
    getUserDto.name = user.name;
    getUserDto.email = user.email;
    return getUserDto;
  }
}
