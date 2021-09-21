import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupService } from './tax-rule-group.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TaxRuleGroupService', () => {
  let service: TaxRuleGroupService;

  const taxRuleGroupRepository = mock<Repository<TaxRuleGroup>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxRuleGroupService,
        {
          provide: getRepositoryToken(TaxRuleGroup),
          useValue: taxRuleGroupRepository,
        },
      ],
    }).compile();

    service = module.get<TaxRuleGroupService>(TaxRuleGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
