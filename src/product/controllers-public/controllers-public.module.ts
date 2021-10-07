import { CustomerAuthModule } from '@app/auth/customer/customer-auth.module';
import { Module } from '@nestjs/common';
import { ProductServiceModule } from '../services/product-service.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ProductServiceModule, CustomerAuthModule],
  controllers: [ProductController],
})
export class ControllersPublicModule {}
