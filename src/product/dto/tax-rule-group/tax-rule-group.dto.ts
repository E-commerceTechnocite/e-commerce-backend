import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class TaxRuleGroupDto {
  @ApiProperty({ required: false })
  @Length(2, 255)
  @IsNotEmpty()
  name?: string;
}
