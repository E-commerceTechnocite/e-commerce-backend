import { ApiProperty } from '@nestjs/swagger';
import {
  IsFirebasePushId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';
import { UpdateStockDto } from '../stock/stock-update.dto';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsOptional()
  reference?: string;

  @ApiProperty({ required: false })
  @Length(10)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  stock?: UpdateStockDto;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
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
