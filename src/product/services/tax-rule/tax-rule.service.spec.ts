import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleService } from './tax-rule.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';
import { CountryRepository } from '@app/product/repositories/country/country.repository';

describe('TaxRuleService', () => {
  let service: TaxRuleService;

  const taxRuleRepository = mock<TaxRuleRepository>();
  const taxRuleGroupRepository = mock<TaxRuleGroupRepository>();
  const countryRepository = mock<CountryRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxRuleService,
        {
          provide: getRepositoryToken(TaxRuleRepository),
          useValue: taxRuleRepository,
        },
        {
          provide: getRepositoryToken(TaxRuleGroupRepository),
          useValue: taxRuleGroupRepository,
        },
        {
          provide: getRepositoryToken(CountryRepository),
          useValue: countryRepository,
        },
      ],
    }).compile();

    service = module.get<TaxRuleService>(TaxRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
