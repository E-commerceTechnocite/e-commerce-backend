import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { UpdateProductCategoryDto } from '@app/product/dto/product-category/update-product-category.dto';

export interface ProductCategoryServiceInterface
  extends CrudServiceInterface<
      ProductCategory,
      ProductCategoryDto,
      UpdateProductCategoryDto
    >,
    PaginatorInterface<ProductCategory> {}

@Injectable()
export class ProductCategoryService implements ProductCategoryServiceInterface {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly repository: Repository<ProductCategory>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<ProductCategory>> {
    const count = await this.repository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException(
        'This page of product-category does not exist',
      );
    }

    const query = this.repository.createQueryBuilder('c');
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
      meta,
    };
  }

  async create(entity: ProductCategoryDto): Promise<ProductCategory> {
    const target: ProductCategory = {
      ...entity,
    };
    return await this.repository.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async delete(entity: ProductCategory): Promise<void> {
    const result = await this.repository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException('Category not found or already deleted');
    }
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException('Category not found or already deleted');
    }
  }

  async find(id: string | number): Promise<ProductCategory> {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  findAll(): Promise<ProductCategory[]> {
    return this.repository.find();
  }

  async update(
    id: string | number,
    entity: UpdateProductCategoryDto,
  ): Promise<void> {
    let category;
    try {
      category = await this.repository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`Category does not exist at id : ${id}`);
    }

    const target: ProductCategory = {
      ...category,
      ...entity,
    };

    await this.repository.save(target);
  }
}
