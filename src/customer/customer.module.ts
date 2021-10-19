import { Order } from '@app/order/entities/order.entity';
import { OrderService } from '@app/order/services/order.service';
import { Country } from '@app/product/entities/country.entity';
import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressController } from './adress/controller/adress-customer.controller';
import { AddressCustomer } from './adress/entity/customer-address.entity';
import { CustomerAddressService } from './adress/service/customer-address.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { Customer } from './entities/customer/customer.entity';
import { CustomerService } from './services/customer/customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Order, AddressCustomer, Country]),
    ShoppingCartServiceModule,
  ],
  providers: [CustomerService, OrderService, CustomerAddressService],
  controllers: [CustomerController, CustomerAddressController],
  exports: [],
})
export class CustomerModule {}
