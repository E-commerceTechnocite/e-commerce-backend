import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CartItemUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
