import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleService } from './tax-rule.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { Repository } from 'typeorm';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Country } from '@app/product/entities/country.entity';
import { mock } from 'jest-mock-extended';

describe('TaxRuleService', () => {
  let service: TaxRuleService;

  const taxRuleRepository = mock<Repository<TaxRule>>();
  const taxRepository = mock<Repository<Tax>>();
  const taxRuleGroupRepository = mock<Repository<TaxRuleGroup>>();
  const countryRepository = mock<Repository<Country>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxRuleService,
        { provide: getRepositoryToken(TaxRule), useValue: taxRuleRepository },
        {
          provide: getRepositoryToken(TaxRuleGroup),
          useValue: taxRuleGroupRepository,
        },
        { provide: getRepositoryToken(Tax), useValue: taxRepository },
        { provide: getRepositoryToken(Country), useValue: countryRepository },
      ],
    }).compile();

    service = module.get<TaxRuleService>(TaxRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
