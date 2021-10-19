import { IsInt, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProductUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
