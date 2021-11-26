import { Module } from '@nestjs/common';
import { OrderServiceModule } from '../services/order-service.module';
import { OrderController } from './order.controller';
import { OrderProductController } from './order-product.controller';

@Module({
  imports: [OrderServiceModule],
  controllers: [OrderProductController, OrderController],
})
export class OrderControllerModule {}
