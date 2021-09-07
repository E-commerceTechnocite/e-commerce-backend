import { Injectable } from '@nestjs/common';
import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Repository } from 'typeorm';
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

  async create(entity: ProductCategoryDto): Promise<void> {
    const target: ProductCategory = {
      label: entity.label,
    };
    await this.repository.save(target);
  }

  async delete(entity: ProductCategory): Promise<void> {
    await this.repository.delete(entity);
  }

  async deleteFromId(id: string | number): Promise<void> {
    await this.repository.delete(id);
  }

  find(id: string | number): Promise<ProductCategory> {
    return this.repository.findOne(id);
  }

  findAll(): Promise<ProductCategory[]> {
    return this.repository.find();
  }

  async update(id: string | number, entity: ProductCategoryDto): Promise<void> {
    const target: ProductCategory = {
      label: entity.label,
    };
    await this.repository.update(id, target);
  }
}
