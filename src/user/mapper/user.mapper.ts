import { Injectable } from '@nestjs/common';
import { GetUserDto } from '../dto/get-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserMapper {
  mapToGetUserDto(user: User): GetUserDto {
    const dto: GetUserDto = new GetUserDto();
    dto.username = user.username;
    dto.password = user.password;
    return dto;
  }
}
