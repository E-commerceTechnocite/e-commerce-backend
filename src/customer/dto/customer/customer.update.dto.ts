import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CustomerUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName?: string;

  //@IsDate()
  @ApiProperty({ required: false })
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  newsletter?: boolean;
}
