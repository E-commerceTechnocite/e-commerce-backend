import { Country } from '@app/product/entities/country.entity';
import { id } from '@app/test/util/id';

export const country = (): Country => ({
  id: id(),
  name: 'Belgium',
  code: 'BE',
  taxRules: undefined,
});
