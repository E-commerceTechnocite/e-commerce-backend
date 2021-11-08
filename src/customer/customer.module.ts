import { Module } from '@nestjs/common';
import { CustomerControllerModule } from '@app/customer/controllers/customer-controller.module';

@Module({
  imports: [CustomerControllerModule],
})
export class CustomerModule {}
