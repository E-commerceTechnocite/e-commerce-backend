import { Module } from '@nestjs/common';
import { ProductControllerModule } from '@app/product/controllers/product-controller.module';

@Module({
  imports: [ProductControllerModule],
})
export class ProductModule {}
