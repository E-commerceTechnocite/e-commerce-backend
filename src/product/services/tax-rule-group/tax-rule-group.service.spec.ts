import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupService } from './tax-rule-group.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { Product } from '@app/product/entities/product.entity';

describe('TaxRuleGroupService', () => {
  let service: TaxRuleGroupService;

  const taxRuleGroupRepository = mock<Repository<TaxRuleGroup>>();
  const taxRuleRepository = mock<Repository<TaxRule>>();
  const productRepository = mock<Repository<Product>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxRuleGroupService,
        {
          provide: getRepositoryToken(TaxRuleGroup),
          useValue: taxRuleGroupRepository,
        },
        {
          provide: getRepositoryToken(TaxRule),
          useValue: taxRuleRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productRepository,
        },
      ],
    }).compile();

    service = module.get<TaxRuleGroupService>(TaxRuleGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
