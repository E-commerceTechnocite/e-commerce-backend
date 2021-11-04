import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from '@app/auth/customer/guard/customer-auth-strategy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [AuthStrategy],
})
export class CustomerGuardModule {}
