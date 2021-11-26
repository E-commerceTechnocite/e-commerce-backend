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
  Query,
} from '@nestjs/common';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
  ApiSearchQueries,
} from '@app/shared/swagger';
import { ApiTags } from '@nestjs/swagger';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { UseAdminGuard } from '@app/auth/admin/guard/decorators/use-admin-guard.decorator';
import { Granted } from '@app/auth/admin/guard/decorators/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';

@ApiTags('Customers')
@UseAdminGuard()
@Controller({ path: 'customers', version: '1' })
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Granted(Permission.READ_CUSTOMER)
  @ApiSearchQueries()
  @ApiOkPaginatedResponse(Customer)
  @Get('search')
  search(
    @Query('q') query: string,
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ) {
    return this.customerService.search(query, page, limit);
  }

  // find all customers
  @Granted(Permission.READ_CUSTOMER)
  @Get('all')
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Granted(Permission.READ_CUSTOMER)
  @ApiOkPaginatedResponse(Customer)
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<Customer>> {
    return this.customerService.getPage(page, limit, { orderBy, order });
  }
  // create a customer
  @Granted(Permission.CREATE_CUSTOMER)
  @Post()
  createCustomer(@Body() customer: CustomerCreateDto): Promise<Customer> {
    return this.customerService.createCustomer(customer);
  }

  // find a customer by id
  @Granted(Permission.READ_CUSTOMER)
  @Get(':customerId')
  findCustomerById(@Param('customerId') customerId): Promise<Customer> {
    return this.customerService.getCustomerById(customerId);
  }

  //update a customer
  @Patch(':customerId')
  @Granted(Permission.UPDATE_CUSTOMER)
  updateCustomer(
    @Param('customerId') customerId: string,
    @Body() customer: CustomerUpdateDto,
  ): Promise<CustomerUpdateDto> {
    return this.customerService.updateCustomer(customerId, customer);
  }
  // Delete a customer
  @Granted(Permission.DELETE_CUSTOMER)
  @Delete(':customerId')
  deleteCustomer(@Param('customerId') customerId): Promise<CustomerDto> {
    return this.customerService.deleteCustomer(customerId);
  }
}
