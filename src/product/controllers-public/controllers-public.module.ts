import { CustomerAuthModule } from '@app/auth/customer/customer-auth.module';
import { JwtAuthGuard } from '@app/auth/customer/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProductServiceModule } from '../services/product-service.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ProductServiceModule, CustomerAuthModule],
  controllers: [ProductController],
})
export class ControllersPublicModule {}
