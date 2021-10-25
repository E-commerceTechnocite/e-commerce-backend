import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  physical?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  incoming?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  pending?: number;
}
