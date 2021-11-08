import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProductCreateDto {
  /* @ApiProperty()
  @IsInt()
  @IsPositive() */
  status?: number;

  /* @ApiProperty()
  @IsInt()
  @IsPositive() */
  paymentType?: number;
}
