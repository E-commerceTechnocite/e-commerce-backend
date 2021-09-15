import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { ProductDto } from '@app/product/dto/product/product.dto';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';

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
    @InjectRepository(TaxRuleGroup)
    private readonly taxRuleGroupRepository: Repository<TaxRuleGroup>,
  ) {}

  async create(entity: ProductDto): Promise<Product> {
    const category = await this.productCategoryRepository.findOne(
      entity.categoryId,
    );
    console.log(category);
    if (!category) {
      throw new BadRequestException(
        `Category not found at id ${entity.categoryId}`,
      );
    }
    delete entity.categoryId;

    const taxRuleGroup = await this.taxRuleGroupRepository.findOne(
      entity.taxRuleGroupId,
    );
    if (!taxRuleGroup) {
      throw new BadRequestException(
        `TaxRuleGroup not found at id ${entity.taxRuleGroupId}`,
      );
    }
    delete entity.taxRuleGroupId;
    const target: Product = {
      ...entity,
      category,
      taxRuleGroup,
    };
    return await this.productRepository.save(target);
  }

  async delete(entity: Product): Promise<void> {
    const result = await this.productRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`Product not found or already deleted`);
    }
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Product not found or already deleted`);
    }
  }

  async find(id: string | number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async update(id: string | number, entity: ProductDto): Promise<void> {
    const category = await this.productCategoryRepository.findOne(
      entity.categoryId,
    );
    if (!category) {
      throw new BadRequestException(
        `Category not found with id ${entity.categoryId}`,
      );
    }
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new BadRequestException(`Product not found with id ${id}`);
    }
    delete entity.categoryId;

    const taxRuleGroup = await this.taxRuleGroupRepository.findOne(
      entity.taxRuleGroupId,
    );
    if (!taxRuleGroup) {
      throw new BadRequestException(
        `TaxRuleGroup not found at id ${entity.taxRuleGroupId}`,
      );
    }
    delete entity.taxRuleGroupId;

    const target: Product = {
      ...product,
      ...entity,
      category,
      taxRuleGroup,
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
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages && meta.maxPages !== 0) {
      throw new NotFoundException('This page of products does not exist');
    }
    const query = this.productRepository.createQueryBuilder('p');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }
    const data = await query
      .leftJoinAndMapOne(
        'p.category',
        ProductCategory,
        'c',
        'p.product_category_id = c.id',
      )
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta,
    };
  }
}
