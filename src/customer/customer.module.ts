import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer/customer.controller';
import { Customer } from './entities/customer/customer.entity';
import { CustomerService } from './services/customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), ShoppingCartServiceModule],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [],
})
export class CustomerModule {}
