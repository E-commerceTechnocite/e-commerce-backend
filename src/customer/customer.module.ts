import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer/customer.controller';
import { Customer } from './entities/customer/customer.entity';
import { CustomerService } from './services/customer/customer.service';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), SharedModule],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [],
})
export class CustomerModule {}
