import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class TaxDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  @Min(0)
  @Max(100)
  rate?: number;
}
