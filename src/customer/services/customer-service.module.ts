import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { SharedModule } from '@app/shared/shared.module';
import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';
import { CustomerRepositoryModule } from '@app/customer/repositories/customer-repository.module';
import { OrderServiceModule } from '@app/order/services/order-service.module';

@Module({
  imports: [
    CustomerRepositoryModule,
    SharedModule,
    ShoppingCartServiceModule,
    OrderServiceModule,
  ],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerServiceModule {}
