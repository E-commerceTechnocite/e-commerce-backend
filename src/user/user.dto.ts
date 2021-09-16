import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({ required: false })
  email?: string;

  username?: string;

  @ApiProperty({ required: false })
  password?: string;

  roleId?: string;
}
