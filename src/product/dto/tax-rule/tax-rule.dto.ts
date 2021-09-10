import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID, Length } from 'class-validator';

export class TaxRuleDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  taxRuleGroupId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  taxId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({ required: false })
  @Length(2, 10)
  @IsNotEmpty()
  zipCode: string;

  @IsNumber()
  @IsNotEmpty()
  behavior: number;

  @ApiProperty({ required: false })
  @Length(2, 10)
  @IsNotEmpty()
  description: string;
}
