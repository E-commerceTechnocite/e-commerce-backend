import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleService } from './tax-rule.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { Repository } from 'typeorm';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Country } from '@app/product/entities/country.entity';
import { mock } from 'jest-mock-extended';
import { GetCheckDeleteEntityIdService } from '@app/shared/services/get-check-delete-entity-id.service';

describe('TaxRuleService', () => {
  let service: TaxRuleService;

  const taxRuleRepository = mock<Repository<TaxRule>>();
  const taxRepository = mock<Repository<Tax>>();
  const taxRuleGroupRepository = mock<Repository<TaxRuleGroup>>();
  const countryRepository = mock<Repository<Country>>();
  const getCheckDeleteService = mock<GetCheckDeleteEntityIdService>();
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxRuleService,
        {
          provide: GetCheckDeleteEntityIdService,
          useValue: getCheckDeleteEntityIdService,
        },
        { provide: getRepositoryToken(TaxRule), useValue: taxRuleRepository },
        {
          provide: getRepositoryToken(TaxRuleGroup),
          useValue: taxRuleGroupRepository,
        },
        { provide: getRepositoryToken(Tax), useValue: taxRepository },
        { provide: getRepositoryToken(Country), useValue: countryRepository },
        {
          provide: GetCheckDeleteEntityIdService,
          useValue: getCheckDeleteService,
        },
      ],
    }).compile();

    service = module.get<TaxRuleService>(TaxRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
