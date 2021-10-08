import { CreateStockDto } from '@app/product/dto/stock/stock-create.dto';
import { UpdateStockDto } from '@app/product/dto/stock/stock-update.dto';
import { Product } from '@app/product/entities/product.entity';
import { Stock } from '@app/product/entities/stock.entity';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StockService
  implements
    CrudServiceInterface<Stock, CreateStockDto, UpdateStockDto>,
    PaginatorInterface<Stock>
{
  constructor(
    @InjectRepository(Stock) private readonly stockRepo: Repository<Stock>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async find(id: string | number): Promise<Stock> {
    const stock = await this.stockRepo.findOne(id);
    if (!stock) {
      throw new NotFoundException(`Stock not found with id : ${id}`);
    }
    return stock;
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepo.find();
  }

  async create(entity: CreateStockDto): Promise<Stock> {
    const product = await this.productRepo.findOne(entity.productId);
    if (!product) {
      throw new NotFoundException(
        `Product not found with id : ${entity.productId}`,
      );
    }
    delete product.id;

    const target: Stock = {
      ...entity,
      product,
    };
    return await this.stockRepo.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(id: string | number, entity: UpdateStockDto): Promise<void> {
    const stock = await this.stockRepo.findOne(id);
    if (!stock) {
      throw new NotFoundException(`Stock does not exists with id: ${id}`);
    }
    delete stock.id;

    const target: Stock = {
      ...stock,
      ...entity,
    };

    await this.stockRepo.update(id, target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.stockRepo.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Stock not found or already deleted`);
    }
  }

  async delete(entity: Stock): Promise<void> {
    const result = await this.stockRepo.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`Stock not found or already deleted`);
    }
  }
  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Stock>> {
    const count = await this.stockRepo.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages && meta.maxPages !== 0) {
      throw new NotFoundException('This page of products does not exist');
    }
    const query = this.stockRepo.createQueryBuilder('s');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ? `s.${orderBy}` : 's.createdAt');
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
}
