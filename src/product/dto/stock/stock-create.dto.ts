import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  physical?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  incoming?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  pending?: number;
}
