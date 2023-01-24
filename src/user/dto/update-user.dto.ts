import { IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;
}
