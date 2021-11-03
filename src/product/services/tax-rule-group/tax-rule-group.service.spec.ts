import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupService } from './tax-rule-group.service';
import { mock, mockFn } from 'jest-mock-extended';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { Product } from '@app/product/entities/product.entity';
import { taxRuleGroup } from '@app/test/stub/entities/tax-rule-group';

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

  describe('findAll', () => {
    it('should return a list of objects', async () => {
      // GIVEN
      const taxRuleGroups = [taxRuleGroup(), taxRuleGroup()];

      const returnResponse = taxRuleGroups.map((t) => ({
        id: t.id,
        name: t.name,
      }));

      const qb = mock<SelectQueryBuilder<TaxRuleGroup>>({
        select: mockFn().mockReturnThis(),
        getMany: mockFn().mockResolvedValueOnce(returnResponse),
      });

      taxRuleGroupRepository.createQueryBuilder.mockReturnValueOnce(qb);

      // WHEN

      const response = await service.findAll();

      // THEN
      expect(response).toEqual(returnResponse);
      expect(taxRuleGroupRepository.createQueryBuilder).toHaveBeenCalledWith(
        'tax_rule_group',
      );
      expect(qb.select).toHaveBeenCalledWith([
        'tax_rule_group.id',
        'tax_rule_group.name',
      ]);
      expect(qb.select.mock.calls.length).toEqual(1);
      expect(qb.getMany).toHaveBeenCalled();
      expect(qb.getMany.mock.calls.length).toEqual(1);
    });
  });
});
