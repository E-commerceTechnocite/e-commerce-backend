import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Country } from '@app/product/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CountryService', () => {
  let service: CountryService;

  const countryRepository = mock<Repository<Country>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: getRepositoryToken(Country), useValue: countryRepository },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
