import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Gender } from '@app/customer/entities/customer/customer.enum';
import { id } from '@app/test/util/id';

export const adresse = (): AddressCustomer => ({
  id: id(),
  address: 'rue de la victoire',
  zipcode: '99AZ',
  city: 'Best',
  region: 'Region parisienne',
  orders: [],
  customer: {
    id: id(),
    username: 'Bob',
    password: '1234',
    email: 'bob@gmail.com',
    phoneNumber: '123456789',
    firstName: 'Bob',
    lastName: 'Marley',
    gender: Gender.masculin,
    birthDate: new Date(Date.now()),
    newsletter: true,
    shoppingCart: {},
    refreshTokens: {},
    orders: [],
    addressCustomers: [],
    confirmRegistration: true,
  },
  country: {
    id: id(),
    name: 'Belgium',
    code: 'BE',
    taxRules: undefined,
  },
});
