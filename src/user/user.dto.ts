import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  password: string;
}
