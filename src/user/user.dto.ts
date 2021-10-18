import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  roleId?: string;
}
