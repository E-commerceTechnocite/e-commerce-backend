import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CountryDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Length(2, 10)
  @IsString()
  code: string;
}
