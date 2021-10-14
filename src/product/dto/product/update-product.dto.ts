import { ApiProperty } from '@nestjs/swagger';
import {
  IsFirebasePushId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Length(2, 255)
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(2, 255)
  reference?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(10)
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @IsPositive()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  taxRuleGroupId?: string;

  @ApiProperty({ required: false, description: 'Picture ids' })
  @IsUUID(4, { each: true })
  @IsOptional()
  picturesId?: string[] = [];

  @ApiProperty({ required: false, description: 'Picture id for the thumbnail' })
  @IsUUID()
  @IsOptional()
  thumbnailId?: string;
}
