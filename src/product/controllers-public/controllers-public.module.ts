import { Module } from '@nestjs/common';
import { ProductServiceModule } from '../services/product-service.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ProductServiceModule],
  controllers: [ProductController],
})
export class ControllersPublicModule {}
