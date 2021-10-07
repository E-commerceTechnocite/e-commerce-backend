import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from '@app/auth/customer/guard/customer-auth-strategy.service';
import { JwtAuthGuard } from '@app/auth/customer/guard/customer-jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [AuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class CustomerGuardModule {}
