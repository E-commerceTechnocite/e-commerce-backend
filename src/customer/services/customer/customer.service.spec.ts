import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { CustomerService } from './customer.service';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { OrderService } from '@app/order/services/order.service';
import { CustomerRepository } from '@app/customer/repositories/customer/customer.repository';

describe('CustomerService', () => {
  let service: CustomerService;
  const customer = mock<CustomerRepository>();
  const searchEngineService = mock<MysqlSearchEngineService>();
  const shoppingCartService = mock<ShoppingCartService>();
  const orderService = mock<OrderService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: getRepositoryToken(CustomerRepository), useValue: customer },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
        { provide: ShoppingCartService, useValue: shoppingCartService },
        { provide: OrderService, useValue: orderService },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
