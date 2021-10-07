import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { ShoppingCartUpdateDto } from '@app/shopping-cart/dto/cart-item/shopping-cart/shopping-cart-update.dto';
import { ShoppingCartDto } from '@app/shopping-cart/dto/cart-item/shopping-cart/shopping-cart.dto';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// TODO wire shopping cart with customer

@Injectable()
export class ShoppingCartService
  implements
    CrudServiceInterface<ShoppingCart, ShoppingCartDto, ShoppingCartUpdateDto>,
    PaginatorInterface<ShoppingCart>
{
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepo: Repository<ShoppingCart>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<ShoppingCart>> {
    const count = await this.shoppingCartRepo.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of shopping cart does not exist');
    }

    const query = this.shoppingCartRepo.createQueryBuilder('shopCart');
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

  async find(id: string | number): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartRepo.findOne(id);
    if (!shoppingCart) {
      throw new NotFoundException('This shopping cart does not exists');
    }
    return shoppingCart;
  }

  findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartRepo.find();
  }

  async create(entity: ShoppingCartDto): Promise<ShoppingCart> {
    const target: ShoppingCart = {
      ...entity,
    };
    return await this.shoppingCartRepo.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(
    id: string | number,
    entity: ShoppingCartUpdateDto,
  ): Promise<void> {
    const target: ShoppingCart = {
      ...entity,
    };

    const result = await this.shoppingCartRepo.update(id, target);
    if (result.affected < 1) {
      throw new BadRequestException(`Shopping cart not found with id ${id}`);
    }
  }
  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.shoppingCartRepo.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Shopping cart not found with id ${id}`);
    }
  }

  async delete(entity: ShoppingCart): Promise<void> {
    const result = await this.shoppingCartRepo.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(
        `Shopping cart not found or already deleted`,
      );
    }
  }
}
