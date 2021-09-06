import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';
import { ProductDto } from '@app/product/dto/product/product.dto';
import { ProductCategory } from '@app/product/entities/product-category.entity';

export interface ProductServiceInterface
  extends CrudServiceInterface<Product, ProductDto, ProductDto> {}

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  create(
    entity: ProductDto,
  ): Promise<void> | Promise<Product> | Promise<InsertResult> {
    this.productCategoryRepository
      .findOne(entity.categoryId)
      .then((category) => {
        delete entity.categoryId;
        const target: Product = {
          ...entity,
          category,
        };
        return this.productRepository.save(target);
      });
    return Promise.resolve(null);
  }

  delete(entity: Product): Promise<void> | Promise<DeleteResult> {
    return this.productRepository.delete(entity);
  }

  deleteFromId(id: string | number): Promise<void> | Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

  find(id: string | number): Promise<Product> | Product {
    return this.productRepository.findOne(id);
  }

  findAll(): Product[] | Promise<Product[]> {
    return this.productRepository.find();
  }

  // @ts-ignore
  async update(
    id: string | number,
    entity: ProductDto,
  ): Promise<Promise<void> | Promise<Product> | Promise<UpdateResult>> {
    const category = await this.productCategoryRepository.findOne(
      entity.categoryId,
    );
    const product = await this.productRepository.findOne(id);
    delete entity.categoryId;
    const target: Product = {
      ...product,
      ...entity,
      category,
    };
    console.log(target);
    return this.productRepository.update(id, target);
  }
}
