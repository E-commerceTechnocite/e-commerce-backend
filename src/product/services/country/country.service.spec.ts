import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Country } from '@app/product/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';

describe('CountryService', () => {
  let service: CountryService;
  const countryRepository = mock<Repository<Country>>();
  const taxRuleRepository = mock<Repository<TaxRule>>();
  const searchEngineService = mock<MysqlSearchEngineService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: getRepositoryToken(Country), useValue: countryRepository },
        { provide: getRepositoryToken(TaxRule), useValue: taxRuleRepository },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
