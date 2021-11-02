import { ApiProperty } from '@nestjs/swagger';

export class UserLogDto {
  @ApiProperty({ required: false })
  email?: string;

  username?: string;

  @ApiProperty({ required: false })
  password?: string;
}
