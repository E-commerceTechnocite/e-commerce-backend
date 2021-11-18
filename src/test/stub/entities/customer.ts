import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Gender } from '@app/customer/entities/customer/customer.enum';

import { id } from '@app/test/util/id';

export const customer = (): Customer => ({
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
});
