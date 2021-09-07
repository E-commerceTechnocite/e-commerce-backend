import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Product } from '@app/product/entities/product.entity';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { PaginationMetadataDto } from '@app/dto/pagination/pagination.metadata.dto';

export class PaginationDto<T> {
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
