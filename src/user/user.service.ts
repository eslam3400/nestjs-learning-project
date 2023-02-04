import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultDto } from 'src/models/result';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userMapper: UserMapper,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    const result = new ResultDto<GetUserDto[]>();
    result.data = users.map((user: User) =>
      this.userMapper.mapUserToGetUserDto(user),
    );
    return result;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    const result = new ResultDto<GetUserDto>();
    result.data = this.userMapper.mapUserToGetUserDto(user);
    return result;
  }

  async updateUser(id: number, userDto: UpdateUserDto) {
    const updateResult: UpdateResult = await this.userRepository.update(id, {
      ...userDto,
    });
    if (!updateResult.affected) throw new NotFoundException();
    const result = new ResultDto();
    result.message = 'User updated successfully';
    return result;
  }

  async deleteUser(id: number) {
    const deleteResult: DeleteResult = await this.userRepository.delete(id);
    if (!deleteResult.affected) throw new NotFoundException();
    const result = new ResultDto();
    result.message = 'User deleted successfully';
    return result;
  }
}
