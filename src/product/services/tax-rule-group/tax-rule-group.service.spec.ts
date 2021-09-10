import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupService } from './tax-rule-group.service';

describe('TaxRuleGroupService', () => {
  let service: TaxRuleGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxRuleGroupService],
    }).compile();

    service = module.get<TaxRuleGroupService>(TaxRuleGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
