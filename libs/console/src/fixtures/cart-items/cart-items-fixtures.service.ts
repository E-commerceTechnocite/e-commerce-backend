import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Product } from '@app/product/entities/product.entity';
import { CartItemCreateFixturesDto } from '@app/shopping-cart/dto/cart-item/cart-item-create-fixtures.dto';
import { CartItemCreateDto } from '@app/shopping-cart/dto/cart-item/cart-item-create.dto';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FixturesInterface } from '../fixtures.interface';

@Injectable()
export class CartItemsFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly logger: ConsoleLogger,
  ) {}

  async load() {
    const customers = await this.customerRepository.find();
    const products = await this.productRepository.find();

    const cartItems = customers.map<CartItem>((customer) => ({
      quantity: Math.floor(1 + Math.random() * 9),
      product: products[Math.floor(Math.random() * products.length)],
      shoppingCart: customer.shoppingCart,
    }));

    await this.cartItemRepository.save(cartItems);
    this.logger.log('loading cart items');
  }

  async clean() {
    await this.cartItemRepository.delete({});
  }
}
