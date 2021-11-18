import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProductUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
