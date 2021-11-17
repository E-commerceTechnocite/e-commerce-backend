import {
  BadRequestException,
  Inject,
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
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CartItemRepository } from '@app/shopping-cart/repositories/cart-item/cart-item.repository';

@Injectable()
export class CartItemService
  implements
    CrudServiceInterface<CartItem, CartItemCreateDto, CartItemUpdateDto>,
    PaginatorInterface<CartItem>
{
  constructor(
    @InjectRepository(CartItemRepository)
    private readonly cartItemRepo: CartItemRepository,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepo: Repository<ShoppingCart>,
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(entity: CartItemCreateDto): Promise<CartItem> {
    //  recupérer  l'id du customer plus validation
    if (!this.request.user) {
      throw new NotFoundException('User not found !');
    }

    const customerId: Customer = this.request.user['id'];
    // a l' aide de customerId  je recupere le customer

    const customer = await this.getCustomerById(customerId);

    // recuperer le productId
    const product = await this.productRepo.findOne(entity.productId);
    if (!product) {
      throw new NotFoundException(
        `Product not found at id ${entity.productId}`,
      );
    }

    // TODO add to the current customer's shopping cart when implemented
    const shoppingCart = await this.shoppingCartRepo.findOne(
      customer.shoppingCart,
    );

    if (!shoppingCart) {
      throw new NotFoundException(
        `Shopping Cart not found at id ${customer.shoppingCart}`,
      );
    }

    //delete entity.cartId;
    delete entity.productId;

    const target: CartItem = {
      product,
      shoppingCart,
      ...entity,
    };
    //console.log(shoppingCart.id);
    console.log(customerId);

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
      throw new NotFoundException();
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
    return this.cartItemRepo.findAndPaginate(index, limit, { ...opts });
  }

  // cette fonction permet de recupérer le customer par son id
  async getCustomerById(customerId): Promise<Customer> {
    try {
      //const shoppingId = await this.shoppingCartRepo.findOneOrFail(customerId);
      return await this.customerRepo.findOneOrFail(customerId);
    } catch (err) {
      throw new NotFoundException("Customer doesn't exist");
    }
  }
}
