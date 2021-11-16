import { CustomerDto } from '@app/customer/dto/customer/customer.dto';

export const createCustomerDto = (): CustomerDto => {
  const stub = new CustomerDto();
  stub.username = 'Bob';
  stub.password = '1234';
  stub.email = 'bob@gmail.com';
  stub.phoneNumber = '123456789';
  stub.firstName = 'Bob';
  stub.lastName = 'Marley';
  //stub.gender= 'Masculin';
  //stub.birthDate= '2000-12-12';
  stub.newsletter = true;
  return stub;
};
