import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PictureDto {
  @ApiProperty({ required: false })
  @IsString()
  title?: string;
  @ApiProperty({ required: false })
  @IsString()
  caption?: string;
}
