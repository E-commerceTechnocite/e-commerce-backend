import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: false })
  email?: string;

  username?: string;

  @ApiProperty({ required: false })
  password?: string;
}
