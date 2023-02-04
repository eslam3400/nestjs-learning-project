import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
