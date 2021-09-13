import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import * as faker from 'faker';

@Injectable()
export class ProductFixturesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>,
  ) {}

  async load() {
    const category: ProductCategory = {
      label: faker.commerce.productAdjective(),
    };
    const savedCategory: ProductCategory = await this.categoryRepo.save(
      category,
    );
    for (let i = 0; i < 10; i++) {
      const product: Product = {
        reference: faker.random.alphaNumeric(10),
        title: faker.commerce.product(),
        price: +faker.commerce.price(1, 100, 2),
        description: faker.random.words(50),
        category: savedCategory,
      };
      await this.productRepo.save(product);
    }
  }

  async clean() {
    await this.productRepo.clear();
    await this.categoryRepo.clear();
  }
}
