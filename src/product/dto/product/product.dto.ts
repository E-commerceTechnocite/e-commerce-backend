import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false })
  reference: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({ required: false })
  categoryId: string;
}
