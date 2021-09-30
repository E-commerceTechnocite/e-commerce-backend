import { Module } from '@nestjs/common';
import { AdminAuthModule } from '@app/auth/admin/admin-auth.module';
import { CustomerAuthModule } from './customer/customer-auth.module';

@Module({
  imports: [AdminAuthModule, CustomerAuthModule],
})
export class AuthModule {}
