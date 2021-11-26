import { Test, TestingModule } from '@nestjs/testing';
import { TaxRuleGroupController } from './tax-rule-group.controller';
import { TaxRuleGroupService } from '@app/product/services/tax-rule-group/tax-rule-group.service';
import { mock } from 'jest-mock-extended';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';

describe('TaxRuleGroupController', () => {
  let controller: TaxRuleGroupController;

  const taxRuleGroupService = mock<TaxRuleGroupService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRuleGroupController],
      providers: [
        { provide: TaxRuleGroupService, useValue: taxRuleGroupService },
      ],
    }).compile();

    controller = module.get<TaxRuleGroupController>(TaxRuleGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should use the admin guard', function () {
    expect(TaxRuleGroupController).toHaveGuard(AdminJwtAuthGuard);
  });
});
