import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { SharedModule } from '@app/shared/shared.module';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';
import { OrderModule } from '@app/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    SharedModule,
    ShoppingCartServiceModule,
    OrderModule,
  ],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerServiceModule {}
