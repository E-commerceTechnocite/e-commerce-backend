import { Test, TestingModule } from '@nestjs/testing';
import { TaxService } from './tax.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Tax } from '@app/product/entities/tax.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TaxService', () => {
  let service: TaxService;

  const taxRepository = mock<Repository<Tax>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxService,
        { provide: getRepositoryToken(Tax), useValue: taxRepository },
      ],
    }).compile();

    service = module.get<TaxService>(TaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
