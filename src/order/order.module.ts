import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { OrderController } from './controllers/OrderController';
import { OrderProductService } from './services/order-product.service';
import { OrderService } from './services/order.service';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { OrderProductController } from './controllers/orderProductController';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Product } from '@app/product/entities/product.entity';
import { Stock } from '@app/product/entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderProduct,
      Customer,
      CartItem,
      Product,
      Stock,
    ]),
  ],
  providers: [OrderProductService, OrderService],
  controllers: [OrderController, OrderProductController],
  exports: [OrderProductService, OrderService],
})
export class OrderModule {}
