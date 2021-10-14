import { CustomerCreateDto } from '@app/customer/dto/customer/customer.create.dto';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';
import { CustomerUpdateDto } from '@app/customer/dto/customer/customer.update.dto';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
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
  constructor(
    private customerService: CustomerService,
    private shoppingCarteService: ShoppingCartService,
  ) {}

  // creer un customer , en meme temps il faut creer un record dans shopping cart
  @Post()
  createCustomer(@Body() customer: CustomerCreateDto): Promise<Customer> {
    return this.customerService.createCustomer(customer);
  }

  // find all customers
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  // find a customer by id
  @Get(':customerId')
  findCustomerById(@Param('customerId') customerId): Promise<Customer> {
    return this.customerService.getCustomerById(customerId);
  }

  //update a customer
  @Patch(':customerId')
  updateCustomer(
    @Param('customerId') customerId: string,
    @Body() customer: CustomerUpdateDto,
  ): Promise<CustomerUpdateDto> {
    return this.customerService.updateCustomer(customerId, customer);
  }
  // Delete a customer
  @Delete(':customerId')
  deleteCustomer(@Param('customerId') customerId): Promise<CustomerDto> {
    return this.customerService.deleteCustomer(customerId);
  }
}
