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
import { Picture } from '@app/file/entities/picture.entity';
import { UpdateProductDto } from '@app/product/dto/product/update-product.dto';

export interface ProductServiceInterface
  extends CrudServiceInterface<Product, ProductDto, UpdateProductDto>,
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
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async create(entity: ProductDto): Promise<Product> {
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

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async update(id: string | number, entity: UpdateProductDto): Promise<void> {
    let product;
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
      category,
      taxRuleGroup,
      pictures,
      thumbnail,
    };
    console.log(target);
    await this.productRepository.save(target);
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
      const { orderBy, order } = opts;
      await query.orderBy(
        orderBy ? `p.${orderBy}` : 'p.createdAt',
        order ?? 'DESC',
      );
    }

    const data = await query
      .leftJoinAndMapOne(
        'p.category',
        ProductCategory,
        'c',
        'p.product_category_id = c.id',
      )
      .leftJoinAndMapOne(
        'p.thumbnail',
        Picture,
        'pic',
        'p.picture_thumbnail_id = pic.id',
      )
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta,
    };
  }
  // get product by title
  async findByTitle(name: string): Promise<any> {
    // const query = this.productRepository.createQueryBuilder('p');
    const product = this.productRepository.findOne({ title: 'name' });
    /* const product = await query
      .leftJoinAndMapOne(
        'p.category',
        ProductCategory,
        'c',
        'p.product_category_id = c.id',
      )
      .leftJoinAndMapOne(
        'p.thumbnail',
        Picture,
        'pic',
        'p.picture_thumbnail_id = pic.id',
      )
      .where('p.title = :name'); */
    //.skip(index * limit - limit)
    //.take(limit)
    // .getOne();
    /* 
    if (!product) {
      throw new NotFoundException();
    } */
    return product;
  }
}
