import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@app/product/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
}
