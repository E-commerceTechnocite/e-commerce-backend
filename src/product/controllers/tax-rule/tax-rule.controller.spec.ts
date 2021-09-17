import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleController } from './tax-rule.controller';
import { mock } from 'jest-mock-extended';
import { TaxRuleService } from '@app/product/services/tax-rule/tax-rule.service';

describe('TaxRuleController', () => {
  let controller: TaxRuleController;

  const taxRuleService = mock<TaxRuleService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRuleController],
      providers: [{ provide: TaxRuleService, useValue: taxRuleService }],
    }).compile();

    controller = module.get<TaxRuleController>(TaxRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
