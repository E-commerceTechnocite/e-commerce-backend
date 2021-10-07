import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from './customer-auth-strategy.services';
import { JwtAuthGuard } from './customer-jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [AuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class CustomerGuardModule {}
