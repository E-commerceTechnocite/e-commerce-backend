import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';
import { ProductDto } from '@app/product/dto/product/product.dto';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/interfaces/paginator.interface';
import { PaginationMetadataDto } from '@app/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/dto/pagination/pagination.dto';

export interface ProductServiceInterface
  extends CrudServiceInterface<Product, ProductDto, ProductDto>,
    PaginatorInterface<Product> {}

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(entity: ProductDto): Promise<void> {
    const category = await this.productCategoryRepository.findOne(
      entity.categoryId,
    );
    delete entity.categoryId;
    const target: Product = {
      ...entity,
      category,
    };
    await this.productRepository.save(target);
  }

  async delete(entity: Product): Promise<void> {
    await this.productRepository.delete(entity);
  }

  async deleteFromId(id: string | number): Promise<void> {
    await this.productRepository.delete(id);
  }

  find(id: string | number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async update(id: string | number, entity: ProductDto): Promise<void> {
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
    await this.productRepository.update(id, target);
  }

  async getPage(
    index: number,
    limit: number,
    opts: PaginationOptions = null,
  ): Promise<PaginationDto<Product>> {
    const count = await this.productRepository.count();
    const query = await this.productRepository.createQueryBuilder('p');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }
    const data = await query
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta: new PaginationMetadataDto(index, limit, count),
    };
  }
}
