import { Module } from '@nestjs/common';
import { CustomerController } from '@app/customer/controllers/customer/customer.controller';
import { CustomerServiceModule } from '@app/customer/services/customer-service.module';
import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';

@Module({
  imports: [CustomerServiceModule, ShoppingCartServiceModule],
  controllers: [CustomerController],
})
export class CustomerControllerModule {}
