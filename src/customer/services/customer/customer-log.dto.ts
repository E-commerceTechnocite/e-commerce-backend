import { ApiProperty } from '@nestjs/swagger';

export class CustomerLogDto {
  @ApiProperty({ required: false })
  email?: string;

  username?: string;

  @ApiProperty({ required: false })
  password?: string;
}
