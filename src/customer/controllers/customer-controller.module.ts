import { Module } from '@nestjs/common';
import { CustomerController } from '@app/customer/controllers/customer/customer.controller';
import { CustomerServiceModule } from '@app/customer/services/customer-service.module';

@Module({
  imports: [CustomerServiceModule],
  controllers: [CustomerController],
})
export class CustomerControllerModule {}
