import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleController } from './tax-rule.controller';

describe('TaxRuleController', () => {
  let controller: TaxRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRuleController],
    }).compile();

    controller = module.get<TaxRuleController>(TaxRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
