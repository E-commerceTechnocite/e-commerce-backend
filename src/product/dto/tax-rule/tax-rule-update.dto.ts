import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Length } from 'class-validator';

export class TaxRuleUpdateDto {
  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  taxId?: string;

  @ApiProperty({ required: false })
  @Length(2, 10)
  @IsNotEmpty()
  zipCode?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  behavior?: number;

  @ApiProperty({ required: false })
  @Length(2, 10)
  @IsNotEmpty()
  description?: string;
}
