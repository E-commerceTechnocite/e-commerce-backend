import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { mock } from 'jest-mock-extended';
import { CountryService } from '@app/product/services/country/country.service';

describe('CountryController', () => {
  let controller: CountryController;

  const countryService = mock<CountryService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{ provide: CountryService, useValue: countryService }],
    }).compile();

    controller = module.get<CountryController>(CountryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
