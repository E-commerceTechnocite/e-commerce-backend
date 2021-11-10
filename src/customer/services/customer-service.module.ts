import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { SharedModule } from '@app/shared/shared.module';
import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';
import { OrderModule } from '@app/order/order.module';
import { CustomerRepositoryModule } from '@app/customer/repositories/customer-repository.module';

@Module({
  imports: [
    CustomerRepositoryModule,
    SharedModule,
    ShoppingCartServiceModule,
    OrderModule,
  ],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerServiceModule {}
