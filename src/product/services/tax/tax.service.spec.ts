import { Test, TestingModule } from '@nestjs/testing';
import { TaxService } from './tax.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Tax } from '@app/product/entities/tax.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleService } from '../tax-rule/tax-rule.service';

describe('TaxService', () => {
  let service: TaxService;

  const taxRepository = mock<Repository<Tax>>();
  const taxRuleRepository = mock<Repository<TaxRule>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxService,
        { provide: getRepositoryToken(Tax), useValue: taxRepository },
        { provide: getRepositoryToken(TaxRule), useValue: taxRuleRepository },
      ],
    }).compile();

    service = module.get<TaxService>(TaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
