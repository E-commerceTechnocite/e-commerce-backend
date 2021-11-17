import { Module } from '@nestjs/common';
import { OrderServiceModule } from '../services/order-service.module';
import { OrderController } from './OrderController';
import { OrderProductController } from './orderProductController';

@Module({
  imports: [OrderServiceModule],
  controllers: [OrderProductController, OrderController],
})
export class OrderControllerModule {}
