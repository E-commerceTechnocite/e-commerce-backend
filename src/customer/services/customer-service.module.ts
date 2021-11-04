import { Module } from '@nestjs/common';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), SharedModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerServiceModule {}
