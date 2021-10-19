import { Country } from '@app/product/entities/country.entity';
import { CountryService } from '@app/product/services/country/country.service';

import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountries(): Promise<Country[]> {
    return this.countryService.findAll();
  }
}
