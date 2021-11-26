import { CountryDto } from '@app/product/dto/country/country.dto';

export const createCountryDto = (): CountryDto => {
  const c = new CountryDto();
  c.name = 'Belgium';
  c.code = 'BE';
  return c;
};
