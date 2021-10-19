import { Body, Controller, Post } from '@nestjs/common';
import { CustomerAddressCreateDto } from '../dto/customer-address.create.dto';
import { AddressCustomer } from '../entity/customer-address.entity';
import { CustomerAddressService } from '../service/customer-address.service';

@Controller('address')
export class CustomerAddressController {
  constructor(private readonly addressService: CustomerAddressService) {}

  @Post()
  async createAddress(
    @Body() address: CustomerAddressCreateDto,
  ): Promise<AddressCustomer> {
    return this.addressService.createCustomerAddress(address);
  }
}
