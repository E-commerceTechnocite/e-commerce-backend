import { UpdateCountryDto } from '@app/product/dto/country/update-country.dto';

export const updateCountryDto = (): UpdateCountryDto => {
  const c = new UpdateCountryDto();
  c.name = 'Belgium';
  c.code = 'BE';
  return c;
};
