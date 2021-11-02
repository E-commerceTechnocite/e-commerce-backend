import { Module } from '@nestjs/common';
import { ProductServiceModule } from '../services/product-service.module';
import { ProductController } from './product/product.controller';
import { CustomerGuardModule } from '@app/auth/customer/guard/customer-guard.module';
import { CountryController } from './product/country.controllers';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';

@Module({
  imports: [
    ProductServiceModule,
    CustomerGuardModule,
    TypeOrmModule.forFeature([Country]),
  ],
  controllers: [ProductController, CountryController],
})
export class ControllersPublicModule {}
