import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CustomerRepository } from '@app/customer/repositories/customer/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerRepository])],
  exports: [TypeOrmModule],
})
export class CustomerRepositoryModule {}
