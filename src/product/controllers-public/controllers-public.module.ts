import { Module } from '@nestjs/common';
import { ProductServiceModule } from '../services/product-service.module';
import { ProductController } from './product/product.controller';
import { CustomerGuardModule } from '@app/auth/customer/guard/customer-guard.module';
import { CountryController } from './product/country.controllers';

@Module({
  imports: [ProductServiceModule, CustomerGuardModule],
  controllers: [ProductController, CountryController],
})
export class ControllersPublicModule {}
