import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  ): Promise<GetUserDto> {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto) {
    const isCreated: boolean = await this.userService.createUser(createDto);
    if (!isCreated) throw new BadRequestException();
    return { message: 'User created successfully' };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    const isUpdated = await this.userService.updateUser(id, updateDto);
    if (!isUpdated) throw new NotFoundException();
    return { message: 'User updated successfully' };
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const isDeleted = await this.userService.deleteUser(id);
    if (!isDeleted) throw new NotFoundException();
    return { message: 'User deleted successfully' };
  }
}
