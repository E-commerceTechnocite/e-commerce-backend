import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCountryDto {
  @ApiProperty({ required: false })
  @Length(2, 100)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @Length(2, 10)
  @IsString()
  @IsOptional()
  code?: string;
}
