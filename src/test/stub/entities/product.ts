import { Product } from '@app/product/entities/product.entity';
import { id } from '@app/test/util/id';

export const product = (): Product => ({
  id: id(),
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
});
