import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer/customer.controller';
import { Customer } from './entities/customer/customer.entity';
import { CustomerService } from './services/customer/customer.service';

@Module({     
    imports: [TypeOrmModule.forFeature([Customer]) ],
    providers: [CustomerService ],
    controllers:[CustomerController],
    exports: [],
})
export class CustomerModule {} 
