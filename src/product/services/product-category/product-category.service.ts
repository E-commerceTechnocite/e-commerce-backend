import { Injectable } from '@nestjs/common';
import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';

export interface ProductCategoryServiceInterface
  extends CrudServiceInterface<
    ProductCategory,
    ProductCategoryDto,
    ProductCategoryDto
  > {}

@Injectable()
export class ProductCategoryService implements ProductCategoryServiceInterface {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly repository: Repository<ProductCategory>,
  ) {}

  create(
    entity: ProductCategoryDto,
  ): Promise<void> | Promise<ProductCategory> | Promise<InsertResult> {
    // transformer du DTO vers l'entité  ProductCategoryDto >> ProductCategory
    const target: ProductCategory = {
      label: entity.label,
    };
    // faire persister l'entité dans la db
    return this.repository.save(target);
  }

  delete(entity: ProductCategory): Promise<void> | Promise<DeleteResult> {
    return this.repository.delete(entity);
  }

  deleteFromId(id: string | number): Promise<void> | Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  find(id: string | number): Promise<ProductCategory> | ProductCategory {
    return this.repository.findOne(id);
  }

  findAll(): ProductCategory[] | Promise<ProductCategory[]> {
    return this.repository.find();
  }

  update(
    id: string | number,
    entity: ProductCategoryDto,
  ): Promise<void> | Promise<ProductCategory> | Promise<UpdateResult> {
    const target: ProductCategory = {
      label: entity.label,
    };
    return this.repository.update(id, target);
  }
}
