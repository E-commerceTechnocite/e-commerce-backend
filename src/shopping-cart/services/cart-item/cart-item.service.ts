import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { CartItemCreateDto } from '@app/shopping-cart/dto/cart-item/cart-item-create.dto';
import { CartItemUpdateDto } from '@app/shopping-cart/dto/cart-item/cart-item-update.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';

@Injectable()
export class CartItemService
  implements
    CrudServiceInterface<CartItem, CartItemCreateDto, CartItemUpdateDto>,
    PaginatorInterface<CartItem>
{
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepo: Repository<ShoppingCart>,
  ) {}

  async create(entity: CartItemCreateDto): Promise<CartItem> {
    const product = await this.productRepo.findOne(entity.productId);
    if (!product) {
      throw new NotFoundException(
        `Product not found at id ${entity.productId}`,
      );
    }

    // TODO add to the current customer's shopping cart when implemented
    const shoppingCart = await this.shoppingCartRepo.findOne(entity.cartId);
    if (!shoppingCart) {
      throw new NotFoundException(
        `Shopping Cart not found at id ${entity.cartId}`,
      );
    }

    delete entity.cartId;
    delete entity.productId;

    const target: CartItem = {
      product,
      shoppingCart,
      ...entity,
    };

    return await this.cartItemRepo.save(target);
  }

  async delete(entity: CartItem): Promise<void> {
    const result = await this.cartItemRepo.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`Cart item not found or already deleted`);
    }
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.cartItemRepo.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Cart item not found or already deleted`);
    }
  }

  async find(id: string | number): Promise<CartItem> {
    const cartItem = await this.cartItemRepo.findOne(id);
    if (!cartItem) {
      throw new NotFoundException(`Cart item at id ${id} not found`);
    }
    return cartItem;
  }

  async findAll(): Promise<CartItem[]> {
    return await this.cartItemRepo.find();
  }

  async update(id: string | number, entity: CartItemUpdateDto): Promise<void> {
    let cartItem = await this.cartItemRepo.findOne(id);
    if (!cartItem) {
      throw new NotFoundException(`Cart item at id ${id} not found`);
    }
    cartItem = {
      ...cartItem,
      ...entity,
    };
    await this.cartItemRepo.save(cartItem);
  }

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<CartItem>> {
    const count = await this.cartItemRepo.count();
    const meta = new PaginationMetadataDto(index, limit, count);

    const data = await this.cartItemRepo
      .createQueryBuilder('i')

      .orderBy(opts.orderBy ? `i.${opts.orderBy}` : 'i.createdAt')
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta,
    };
  }
}
