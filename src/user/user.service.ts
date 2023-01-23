import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(private userMapper: UserMapper) {
    this.generateDumpUsers();
  }

  private generateDumpUsers(): void {
    for (let i = 0; i < 3; i++) {
      this.users.push({
        id: i + 1,
        username: `user${i + 1}`,
        password: `pass${i + 1}`,
      });
    }
  }

  getUsers(): GetUserDto[] {
    if (this.users.length == 0) return [];
    return this.users.map((user: User) =>
      this.userMapper.mapToGetUserDto(user),
    );
  }

  getUserById(id: number): GetUserDto | undefined {
    const user = this.users.find((user: User) => user.id == id);
    if (!user) return undefined;
    return this.userMapper.mapToGetUserDto(user);
  }

  createUser(userDto: CreateUserDto): boolean {
    const user: User = { ...userDto, id: this.users.length + 1 };
    this.users.push(user);
    return true;
  }

  updateUser(id: number, userDto: UpdateUserDto): boolean {
    const user = this.users.find((user: User) => user.id == id);
    if (!user) return false;
    user.username = userDto.username;
    user.password = userDto.password;
    return true;
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex((user: User) => user.id == id);
    if (userIndex === -1) false;
    this.users.splice(userIndex, 1);
    return true;
  }
}
