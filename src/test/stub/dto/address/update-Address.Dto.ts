import { CustomerAddressUpdateDto } from '@app/customer/adress/dto/customer-address.update.dto';

export const updateAddressDto = (): CustomerAddressUpdateDto => {
  const stub = new CustomerAddressUpdateDto();
  stub.address = 'rue de la victoire';
  stub.zipcode = '99AZ';
  stub.city = 'Paris';
  stub.region = 'Parisienne';
  stub.countryId = '4320db13-ad42-494a-94f8-4b86bb1776a2';
  return stub;
};
