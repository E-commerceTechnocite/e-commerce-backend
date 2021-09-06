import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';

export interface ProductServiceInterface
  extends CrudServiceInterface<Product> {}

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(
    entity: Product,
  ): Promise<void> | Promise<Product> | Promise<InsertResult> {
    return this.productRepository.save(entity);
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

  update(
    id: string | number,
    entity: Product,
  ): Promise<void> | Promise<Product> | Promise<UpdateResult> {
    return this.productRepository.update(id, entity);
  }
}
