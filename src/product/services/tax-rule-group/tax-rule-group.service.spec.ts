import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupService } from './tax-rule-group.service';
import { mock } from 'jest-mock-extended';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';
import { ProductRepository } from '@app/product/repositories/product/product.repository';

describe('TaxRuleGroupService', () => {
  let service: TaxRuleGroupService;

  const taxRuleGroupRepository = mock<TaxRuleGroupRepository>();
  const taxRuleRepository = mock<TaxRuleRepository>();
  const productRepository = mock<ProductRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxRuleGroupService,
        {
          provide: getRepositoryToken(TaxRuleGroupRepository),
          useValue: taxRuleGroupRepository,
        },
        {
          provide: getRepositoryToken(TaxRuleRepository),
          useValue: taxRuleRepository,
        },
        {
          provide: getRepositoryToken(ProductRepository),
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
