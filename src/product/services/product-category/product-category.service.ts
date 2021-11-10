import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { UpdateProductCategoryDto } from '@app/product/dto/product-category/update-product-category.dto';
import { Product } from '@app/product/entities/product.entity';
import { SearchServiceInterface } from '@app/shared/interfaces/search-service.interface';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export interface ProductCategoryServiceInterface
  extends CrudServiceInterface<
      ProductCategory,
      ProductCategoryDto,
      UpdateProductCategoryDto
    >,
    PaginatorInterface<ProductCategory>,
    SearchServiceInterface<ProductCategory> {}

@Injectable()
export class ProductCategoryService implements ProductCategoryServiceInterface {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly repository: Repository<ProductCategory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly searchEngine: MysqlSearchEngineService,
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

    const data = await this.repository.find({
      skip: index * limit - limit,
      take: limit,
      order: { [opts?.orderBy ?? 'createdAt']: opts?.order ?? 'DESC' },
    });

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

  async deleteWithId(id: string | number): Promise<any[]> {
    let target;
    try {
      target = await this.repository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new BadRequestException(
        `Category not found or already deleted at id : ${id}`,
      );
    }

    const products = {
      entityType: 'Product',
      products: await this.productRepository
        .createQueryBuilder('product')
        .where('product.product_category_id=:id', { id: id })
        .getMany(),
    };

    await this.repository.delete(id);

    return [products];
  }

  async find(id: string | number): Promise<ProductCategory> {
    let target;
    try {
      target = await this.repository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`Category does not exist at id : ${id}`);
    }
    return target;
  }

  findAll(): Promise<any[]> {
    return this.repository
      .createQueryBuilder('product_category')
      .select(['product_category.id', 'product_category.label'])
      .getMany();
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

  async search(
    query: string,
    index: number,
    limit: number,
  ): Promise<PaginationDto<ProductCategory>> {
    try {
      const sqlQuery = this.searchEngine.createSearchQuery(
        this.repository.createQueryBuilder('p'),
        query,
        [{ name: 'label' }],
      );

      const count = await sqlQuery.getCount();
      const meta = new PaginationMetadataDto(index, limit, count);
      const data = await sqlQuery
        .skip(index * limit - limit)
        .take(limit)
        .getMany();
      return { data, meta };
    } catch (err) {
      if (err instanceof RuntimeException) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}
