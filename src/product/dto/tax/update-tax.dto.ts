import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class UpdateTaxDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  @Min(0)
  @Max(100)
  @IsOptional()
  rate?: number;
}
