import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<GetUserDto[]> {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetUserDto | NotFoundException> {
    const user = await this.userService.getUserById(id);
    if (!user) return new NotFoundException();
    return user;
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto): Promise<boolean> {
    return this.userService.createUser(createDto);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
