import { Customer } from '@app/customer/entities/customer/customer.entity';
import { OrderProduct } from '@app/order/entities/order-product.entity';
import { Order } from '@app/order/entities/order.entity';
import { Product } from '@app/product/entities/product.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FixturesInterface } from '../fixtures.interface';

@Injectable()
export class OrderProductFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private readonly logger: ConsoleLogger,
  ) {}

  async load() {
    const customers = await this.customerRepository.find();
    //const cartItems = await this.cartItemRepository.find();
    const orderProducts = [];

    for (let i = 0; i < customers.length; i++) {
      const cartItem = await this.cartItemRepository.findOne({
        where: { shoppingCart: { id: customers[i].shoppingCart.id } },
        relations: ['product'],
      });
      orderProducts.push({
        order: customers[i].orders[0],
        quantity: cartItem.quantity,
        product: cartItem.product,
        title: cartItem.product.title,
        reference: cartItem.product.reference,
        price: cartItem.product.price,
      });
    }
    await this.orderProductRepository.save(orderProducts);
    await this.cartItemRepository.delete({});
    this.logger.log('Orders Product added');
  }

  async clean() {
    await this.orderProductRepository.delete({});
  }
}
