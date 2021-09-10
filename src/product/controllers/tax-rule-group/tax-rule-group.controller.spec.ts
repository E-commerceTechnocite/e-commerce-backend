import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupController } from './tax-rule-group.controller';

describe('TaxRuleGroupController', () => {
  let controller: TaxRuleGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRuleGroupController],
    }).compile();

    controller = module.get<TaxRuleGroupController>(TaxRuleGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
