import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { CustomerService } from './customer.service';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';

describe('CustomerService', () => {
  let service: CustomerService;
  const customer = mock<Repository<Customer>>();
  const searchEngineService = mock<MysqlSearchEngineService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: getRepositoryToken(Customer), useValue: customer },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
