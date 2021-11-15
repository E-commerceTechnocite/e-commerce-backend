import { CustomerAddressCreateDto } from '@app/customer/adress/dto/customer-address.create.dto';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';

export const createCustomerAddressDto = (): CustomerAddressCreateDto => {
  const stub = new CustomerAddressCreateDto();
  stub.address = 'rue de la victoire';
  stub.zipcode = '99AZ';
  stub.city = 'Paris';
  stub.region = 'Parisienne';
  stub.countryId = '4320db13-ad42-494a-94f8-4b86bb1776a2';
  return stub;
};
