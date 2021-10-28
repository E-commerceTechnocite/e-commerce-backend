import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateProductCategoryDto {
  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsNotEmpty()
  @IsOptional()
  label?: string;
}
