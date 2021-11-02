import { Module } from '@nestjs/common';
import { CustomerController } from '@app/customer/controllers/customer/customer.controller';
import { AdminGuardModule } from '@app/auth/admin/guard/admin-guard.module';
import { CustomerServiceModule } from '@app/customer/services/customer-service.module';

@Module({
  imports: [AdminGuardModule, CustomerServiceModule],
  controllers: [CustomerController],
})
export class CustomerControllerModule {}
