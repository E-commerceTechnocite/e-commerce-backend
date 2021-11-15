import { Module } from '@nestjs/common';
import { OrderRepositoryModule } from '../repositories/order-repository.module';
import { OrderProductService } from './order-product.service';
import { OrderService } from './order.service';

@Module({
  imports: [OrderRepositoryModule],
  providers: [OrderService, OrderProductService],
  exports: [OrderService, OrderProductService],
})
export class OrderServiceModule {}
