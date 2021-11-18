import { CustomerDto } from '@app/customer/dto/customer/customer.dto';

export const updateCustomerDto = () => {
  const stub = new CustomerDto();
  stub.username = 'Bob';
  stub.password = '1234';
  stub.email = 'bob@gmail.com';
  stub.firstName = 'Bob';
  stub.lastName = '123456789';
  stub.birthDate = new Date(Date.now());
  stub.newsletter = true;

  return stub;
};
