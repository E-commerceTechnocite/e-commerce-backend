import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsNotEmpty()
  reference: string;

  @ApiProperty({ required: false })
  @Length(10)
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  taxRuleGroupId: string;
}
