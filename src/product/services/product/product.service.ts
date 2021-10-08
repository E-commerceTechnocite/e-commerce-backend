import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ILike, Repository } from 'typeorm';
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
import { Connection } from 'typeorm';
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
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async gcdei<T>(repo: Repository<T>, dto: any, id: string): Promise<T> {
    const entity = await repo.findOne(dto[id]);
    if (!entity) {
      throw new BadRequestException(`Not found at id ${dto[id]}`);
    }
    delete dto[id];
    return entity;
  }

  async create(entity: ProductDto): Promise<Product> {
    if (!entity.picturesId) {
      entity.picturesId = [];
    }

    const category = await this.gcdei<ProductCategory>(
      this.productCategoryRepository,
      entity,
      'categoryId',
    );

    const taxRuleGroup = await this.gcdei<TaxRuleGroup>(
      this.taxRuleGroupRepository,
      entity,
      'taxRuleGroupId',
    );

    let pictures;
    try {
      pictures = await this.pictureRepository.findByIds(entity.picturesId);
    } catch (error) {
      throw new BadRequestException(error);
    }

    let thumbnail;
    try {
      thumbnail = await this.pictureRepository.findOne(entity.thumbnailId);
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
    const product = await this.productRepository.findOne(id, {
      loadEagerRelations: true,
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async update(id: string | number, entity: ProductDto): Promise<void> {
    const category = await this.gcdei<ProductCategory>(
      this.productCategoryRepository,
      entity,
      'categoryId',
    );

    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new BadRequestException(`Product not found with id ${id}`);
    }

    const taxRuleGroup = await this.gcdei<TaxRuleGroup>(
      this.taxRuleGroupRepository,
      entity,
      'taxRuleGroupId',
    );

    let pictures;
    try {
      pictures = await this.pictureRepository.findByIds(entity.picturesId);
    } catch (error) {
      throw new BadRequestException(error);
    }

    let thumbnail;
    try {
      thumbnail = await this.pictureRepository.findOne(entity.thumbnailId);
    } catch (error) {
      throw new BadRequestException(error);
    }
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
      await query.orderBy(orderBy ? `p.${orderBy}` : 'p.createdAt');
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
  async findByTitle(name: string): Promise<Product> {
    /* let connection: Connection;
    const product = await connection.getRepository(Product).find({
      title: ILike('%name%'),
    }); */

    return this.productRepository.findOne(name);
  }
}
