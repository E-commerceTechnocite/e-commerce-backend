import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Product } from '@app/product/entities/product.entity';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';

export class PaginationDto<T> {
  constructor(pagination: { data?: T[]; meta?: PaginationMetadataDto }) {
    const { data, meta } = pagination;
    this.data = data;
    this.meta = meta;
  }

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(Product) },
      { $ref: getSchemaPath(ProductCategory) },
    ],
  })
  data: T[];
  @ApiProperty({ type: PaginationMetadataDto })
  meta: PaginationMetadataDto;
}
