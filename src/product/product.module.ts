import { Module } from '@nestjs/common';
import { ProductControllerModule } from '@app/product/controllers/product-controller.module';
import { ControllersPublicModule } from './controllers-public/controllers-public.module';

@Module({
  imports: [ProductControllerModule, ControllersPublicModule],
})
export class ProductModule {}
