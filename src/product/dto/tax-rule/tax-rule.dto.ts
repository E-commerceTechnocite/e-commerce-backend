import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';

export class TaxRuleDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  taxRuleGroupId?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  tax?: number;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  countryId?: string;

  @ApiProperty({ required: false })
  @Length(2, 10)
  @IsNotEmpty()
  zipCode?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  behavior?: number;

  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsNotEmpty()
  description?: string;
}
