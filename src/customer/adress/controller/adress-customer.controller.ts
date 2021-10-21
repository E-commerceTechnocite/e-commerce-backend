import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerAddressCreateDto } from '../dto/customer-address.create.dto';
import { CustomerAddressUpdateDto } from '../dto/customer-address.update.dto';
import { AddressCustomer } from '../entity/customer-address.entity';
import { CustomerAddressService } from '../service/customer-address.service';

@Controller('customer/address')
export class CustomerAddressController {
  constructor(private readonly addressService: CustomerAddressService) {}

  @Post()
  async createAddress(
    @Body() address: CustomerAddressCreateDto,
  ): Promise<AddressCustomer> {
    return this.addressService.createCustomerAddress(address);
  }
  @Get(':id')
  async getAddressById(@Param() id): Promise<AddressCustomer> {
    return this.addressService.getAddressCustomer(id);
  }

  @Get()
  async getAllAddressOfCustomer(): Promise<AddressCustomer[]> {
    return this.addressService.getAllAddressCustomer();
  }
  @Patch(':customerId')
  async updateAddressCustomer(
    @Body() address: CustomerAddressUpdateDto,
    @Param('addressId') addressId: string,
  ): Promise<AddressCustomer> {
    return this.addressService.updateCustomerAddress(address, addressId);
  }

  @Delete(':addressId')
  async deleteAddressCustomer(
    @Param('addressId') addressId,
  ): Promise<AddressCustomer> {
    return this.addressService.deleteAddressCustomer(addressId);
  }
}
