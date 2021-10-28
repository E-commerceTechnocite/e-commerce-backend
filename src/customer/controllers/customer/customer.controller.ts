import { CustomerCreateDto } from '@app/customer/dto/customer/customer.create.dto';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';
import { CustomerUpdateDto } from '@app/customer/dto/customer/customer.update.dto';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // create a customer
  @Post()
  createCustomer(
    @Body() customer: CustomerCreateDto,
  ): Promise<CustomerCreateDto> {
    return this.customerService.create(customer);
  }

  // find all customers
  @Get()
  findAll(): Promise<CustomerDto[]> {
    return this.customerService.findAll();
  }

  // find a customer by id
  @Get(':customerId')
  findCustomerById(@Param('customerId') customerId): Promise<CustomerDto> {
    return this.customerService.find(customerId);
  }

  //update a customer
  @Patch(':customerId')
  updateCustomer(
    @Param('customerId') customerId: string,
    @Body() customer: CustomerUpdateDto,
  ): Promise<void> {
    return this.customerService.update(customerId, customer);
  }
  // Delete a customer
  @Delete(':customerId')
  deleteCustomer(@Param('customerId') customerId): Promise<void> {
    return this.customerService.deleteFromId(customerId);
  }
}
