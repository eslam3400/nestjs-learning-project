import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(
    private userMapper: UserMapper,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user: User) => this.userMapper.mapToGetUserDto(user));
  }

  async getUserById(id: number): Promise<GetUserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    return this.userMapper.mapToGetUserDto(user);
  }

  async createUser(userDto: CreateUserDto): Promise<boolean> {
    const user: User = this.userMapper.mapFromCreateUserDto(userDto);
    const createdUser = await this.userRepository.save(user);
    if (!createdUser) return false;
    return true;
  }

  async updateUser(id: number, userDto: UpdateUserDto): Promise<boolean> {
    const user: User = this.userMapper.mapFromUpdateUserDto(userDto);
    const updatedUser = await this.userRepository.update(id, user);
    if (!updatedUser) return false;
    return true;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) return false;
    return true;
  }
}
