import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): GetUserDto[] {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param() params: any): GetUserDto | NotFoundException {
    const user = this.userService.getUserById(params.id);
    if (!user) return new NotFoundException();
    return user;
  }

  @Post()
  createUser(@Body() createDto: CreateUserDto): boolean {
    return this.userService.createUser(createDto);
  }

  @Patch('/:id')
  updateUser(
    @Param() params: { id: number },
    @Body() updateDto: UpdateUserDto,
  ): boolean {
    return this.userService.updateUser(params.id, updateDto);
  }

  @Delete('/:id')
  deleteUser(@Param() params: { id: number }): boolean {
    return this.userService.deleteUser(params.id);
  }
}
