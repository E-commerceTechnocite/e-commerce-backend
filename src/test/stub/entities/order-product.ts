import { Gender } from '@app/customer/entities/customer/customer.enum';
import { OrderProduct } from '@app/order/entities/order-product.entity';
import { Product } from '@app/product/entities/product.entity';
import { id } from '@app/test/util/id';

export const orderProduct = (): OrderProduct => ({
  id: id(),
  quantity: 100,

  product: {
    category: {},
    title: 'title',
    reference: '1234',
    price: 39.99,
    description: 'description',
    stock: {
      physical: 10,
      pending: 10,
      incoming: 10,
    },
    pictures: [],
    thumbnail: { uri: '/1' },
    taxRuleGroup: {},
  },

  order: {
    status: 0,
    paymentType: 0,
    //orderProduct:[],
    address: {
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
    },
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
  },
});
