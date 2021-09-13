import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleService } from './tax-rule.service';

describe('TaxRuleService', () => {
  let service: TaxRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxRuleService],
    }).compile();

    service = module.get<TaxRuleService>(TaxRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
