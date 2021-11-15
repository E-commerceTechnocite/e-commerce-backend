import { Module } from '@nestjs/common';
import { OrderControllerModule } from './controllers/order-controller.module';

@Module({
  imports: [OrderControllerModule],
})
export class OrderModule {}
