import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Product } from '@app/product/entities/product.entity';
import { Stock } from '@app/product/entities/stock.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
import { OrderProductRepository } from './order-product/order-product.repository';
import { OrderRepository } from './order/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderProduct,
      Customer,
      CartItem,
      Product,
      Stock,
      OrderRepository,
      OrderProductRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class OrderRepositoryModule {}
