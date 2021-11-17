import { UseCustomerGuard } from '@app/auth/customer/guard/decorators/use-customer-guard.decorator';
import { Country } from '@app/product/entities/country.entity';
import { CountryService } from '@app/product/services/country/country.service';

import { Controller, Get, Param } from '@nestjs/common';

@UseCustomerGuard()
@Controller({ path: 'customer/country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountries(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  async getCountryById(@Param() countryId: string): Promise<Country> {
    return this.countryService.find(countryId);
  }
}
