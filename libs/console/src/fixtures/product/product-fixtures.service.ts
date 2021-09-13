import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';

@Injectable()
export class ProductFixturesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>,
  ) {}

  async load() {
    //  TODO
  }

  async clean() {
    await this.categoryRepo.clear();
    await this.productRepo.clear();
  }
}
