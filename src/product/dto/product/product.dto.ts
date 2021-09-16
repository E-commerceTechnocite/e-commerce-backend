import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID, Length } from 'class-validator';

export class ProductDto {
  @ApiProperty({ required: false })
  @Length(2, 255)
  title?: string;

  @ApiProperty({ required: false })
  @Length(2, 255)
  reference?: string;

  @ApiProperty({ required: false })
  @Length(10)
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @ApiProperty({ required: false })
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  taxRuleGroupId?: string;

  @ApiProperty({ required: false, description: 'Picture ids' })
  @IsUUID(null, { each: true })
  picturesId?: string[];

  @ApiProperty({ required: false, description: 'Picture id for the thumbnail' })
  @IsUUID()
  thumbnailId?: string;
}
