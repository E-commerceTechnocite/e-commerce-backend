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
    const categories: ProductCategory[] = [];
    const products: Product[] = [];
    for (let i = 0; i < 6; i++) {
      categories.push({
        label: faker.commerce.productAdjective(),
      });
    }
    const savedCategories: ProductCategory[] = await this.categoryRepo.save(
      categories,
    );
    for (let i = 0; i < 50; i++) {
      products.push({
        reference: faker.random.alphaNumeric(10),
        title: faker.commerce.product(),
        price: +faker.commerce.price(1, 100, 2),
        description: faker.random.words(50),
        category:
          savedCategories[Math.floor(Math.random() * savedCategories.length)],
      });
    }
    await this.productRepo.save(products);
  }

  async clean() {
    await this.productRepo.delete({});
    await this.categoryRepo.delete({});
  }
}
