import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { ProductDto } from '@app/product/dto/product/product.dto';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { Picture } from '@app/file/entities/picture.entity';

import { UpdateProductDto } from '@app/product/dto/product/update-product.dto';
import { JSDOM } from 'jsdom';
import * as metaphone from 'talisman/phonetics/metaphone';
import { SearchServiceInterface } from '@app/shared/interfaces/search-service.interface';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { ProductRepository } from '@app/product/repositories/product/product.repository';
import { ProductCategoryRepository } from '@app/product/repositories/product-category/product-category.repository';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';

export interface ProductServiceInterface
  extends CrudServiceInterface<Product, ProductDto, UpdateProductDto>,
    PaginatorInterface<Product>,
    SearchServiceInterface<Product> {}

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    @InjectRepository(ProductCategoryRepository)
    private readonly productCategoryRepository: ProductCategoryRepository,
    @InjectRepository(TaxRuleGroupRepository)
    private readonly taxRuleGroupRepository: TaxRuleGroupRepository,
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  private formatDescription(description): {
    stripped: string;
    metaphoned: string;
  } {
    if (!description) return null;
    const domDescription = new JSDOM(description);
    const document = domDescription.window.document;
    if (document.querySelector('script')) {
      throw new BadRequestException(
        'Script tags are not authorized inside descriptions',
      );
    }
    const stripped = document.body.textContent;
    const metaphoned = stripped.split(' ').map(metaphone).join(' ');

    return {
      metaphoned,
      stripped,
    };
  }

  async create(entity: ProductDto): Promise<Product> {
    const desc = this.formatDescription(entity.description);
    const metaphoneTitle = entity.title?.split(' ').map(metaphone).join(' ');

    if (!entity.picturesId) {
      entity.picturesId = [];
    }

    let category;
    try {
      category = await this.productCategoryRepository.findOneOrFail({
        where: { id: entity.categoryId },
      });
    } catch {
      throw new NotFoundException(
        `Category does not exist at id : ${entity.categoryId}`,
      );
    }
    delete entity.categoryId;

    let taxRuleGroup;
    try {
      taxRuleGroup = await this.taxRuleGroupRepository.findOneOrFail({
        where: { id: entity.taxRuleGroupId },
      });
    } catch {
      throw new NotFoundException(
        `Tax Rule Group does not exist at id : ${entity.taxRuleGroupId}`,
      );
    }
    delete entity.taxRuleGroupId;

    let pictures;
    try {
      pictures = await this.pictureRepository.findByIds(entity.picturesId);
    } catch (error) {
      throw new BadRequestException(error);
    }

    let thumbnail;
    try {
      thumbnail = await this.pictureRepository.findOneOrFail({
        where: {
          id: entity.thumbnailId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }

    delete entity.picturesId;
    delete entity.thumbnailId;
    const target: Product = {
      ...entity,
      metaphoneDescription: desc.metaphoned,
      strippedDescription: desc.stripped,
      metaphoneTitle,
      category,
      taxRuleGroup,
      pictures,
      thumbnail,
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
    let product;
    try {
      product = await this.productRepository.findOneOrFail({
        where: { id: id },
        loadEagerRelations: true,
      });
    } catch {
      throw new NotFoundException(`Product does not exist at id : ${id} `);
    }
    return product;
  }

  async findAll(): Promise<any[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .select('product.id')
      .addSelect("CONCAT(product.title,' ',product.price)", 'detail')
      .execute();
  }

  async update(id: string | number, entity: UpdateProductDto): Promise<void> {
    const desc = this.formatDescription(entity.description);
    const metaphoneTitle = entity.title?.split(' ').map(metaphone).join(' ');
    let product: Product;
    try {
      product = await this.productRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new BadRequestException(`Product not found with id ${id}`);
    }

    let category;
    if (entity.categoryId != undefined) {
      try {
        category = await this.productCategoryRepository.findOneOrFail({
          where: { id: entity.categoryId },
        });
      } catch {
        throw new NotFoundException(
          `Category does not exist at id : ${entity.categoryId}`,
        );
      }
    }

    let taxRuleGroup;
    if (entity.taxRuleGroupId != undefined) {
      try {
        taxRuleGroup = await this.taxRuleGroupRepository.findOneOrFail({
          where: { id: entity.taxRuleGroupId },
        });
      } catch {
        throw new NotFoundException(
          `Tax Rule Groupe doest not exist at id : ${entity.taxRuleGroupId}`,
        );
      }
    }

    let pictures;
    if (entity.picturesId != undefined) {
      try {
        pictures = await this.pictureRepository.findByIds(entity.picturesId);
      } catch {
        throw new BadRequestException(`Pictures ids bad request`);
      }
    }

    let thumbnail;
    if (entity.thumbnailId != undefined) {
      try {
        thumbnail = await this.pictureRepository.findOneOrFail({
          where: { id: entity.thumbnailId },
        });
      } catch {
        throw new BadRequestException(`thumbnail bad request`);
      }
    }

    delete entity.categoryId;
    delete entity.taxRuleGroupId;
    delete entity.picturesId;
    delete entity.thumbnailId;

    const target: Product = {
      ...product,
      ...entity,
      strippedDescription: desc?.stripped ?? product.strippedDescription,
      metaphoneDescription: desc?.metaphoned ?? product.metaphoneDescription,
      metaphoneTitle: metaphoneTitle ?? product.metaphoneTitle,
      stock: {
        ...product.stock,
        ...entity.stock,
      },
      category,
      taxRuleGroup,
      pictures,
      thumbnail,
    };
    await this.productRepository.save(target);
  }

  async getPage(
    index: number,
    limit: number,
    opts: PaginationOptions = {},
  ): Promise<PaginationDto<Product>> {
    return await this.productRepository.findAndPaginate(index, limit, {
      ...opts,
    });
  }

  async search(
    query: string,
    index: number,
    limit: number,
  ): Promise<PaginationDto<Product>> {
    try {
      const SQLQuery = this.productRepository.createSearchQuery(
        'p',
        query,
        [
          { name: 'title' },
          { name: 'metaphoneTitle', type: 'metaphone' },
          { name: 'reference' },
          { name: 'strippedDescription' },
          { name: 'metaphoneDescription', type: 'metaphone' },
        ],
        [
          { 'p.category': 'c' },
          { 'p.taxRuleGroup': 'trg' },
          { 'p.stock': 'stock' },
          { 'p.pictures': 'pictures' },
          { 'p.thumbnail': 'thumbnail' },
        ],
      );

      const count = await SQLQuery.getCount();
      const data = await SQLQuery.offset(index * limit - limit)
        .limit(limit)
        .getMany();

      const meta = new PaginationMetadataDto(index, limit, count);

      if (meta.currentPage > meta.maxPages) {
        throw new NotFoundException('This page of products does not exist');
      }
      return { data, meta };
    } catch (err) {
      if (err instanceof RuntimeException || err instanceof QueryFailedError) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  // get product by title
  async findByTitle(name: string): Promise<any> {
    return this.productRepository.findOne({ title: name });
  }
}
