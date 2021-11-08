import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Length } from 'class-validator';

export class TaxRuleUpdateDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  tax?: number;

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
