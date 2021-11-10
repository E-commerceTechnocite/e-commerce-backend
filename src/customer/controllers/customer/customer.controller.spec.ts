import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { Matcher, mock } from 'jest-mock-extended';
import { customer } from '@app/test/stub/entities/customer';
import { createCustomerDto } from '@app/test/stub/dto/customer/create-customer.dto';
import { updateCustomerDto } from '@app/test/stub/dto/customer/update-customer.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { Customer } from '@app/customer/entities/customer/customer.entity';

describe('CustomerController', () => {
  let controller: CustomerController;

  const mockCustomerService = mock<CustomerService>();
  const mockShoppingCartService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, ShoppingCartService],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .overrideProvider(ShoppingCartService)
      .useValue(mockShoppingCartService)
      .compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // test method findAll()
  describe('findAll', () => {
    it('should return all customers', async () => {
      // GIVEN
      const c = customer();
      mockCustomerService.find.mockResolvedValue(c);

      // WHEN
      const response = await controller.findAll();

      // THEN
      expect(response).resolves;
      expect(mockCustomerService.find).toBeCalled;
    });
  });

  // test create a customer method
  describe('createCustomer', () => {
    it('should create a customer', async () => {
      // GIVEN
      const c = createCustomerDto();

      // WHEN
      const response = await controller.createCustomer(c);

      // THEN
      expect(mockCustomerService.createCustomer).toHaveBeenCalledWith(c);
    });
  });
  // test find customer by id
  describe('findCustomerById', () => {
    it('should return one customer', async () => {
      // GIVEN
      const c = customer();
      mockCustomerService.getCustomerById.mockResolvedValue(c);

      // WHEN
      const response = await controller.findCustomerById(c.id);

      // THEN
      expect(response).toEqual(c);
      expect(mockCustomerService.getCustomerById).toHaveBeenCalledWith(c.id);
    });
  });

  // test update customer
  describe('updateCustomer', () => {
    it('should call the updateCustomer method from the service', async () => {
      // GIVEN
      const id = '1234';
      const c = updateCustomerDto();

      // WHEN
      const response = await controller.updateCustomer(id, c);

      // THEN
      expect(mockCustomerService.updateCustomer).toHaveBeenCalledWith(id, c);
    });
  });
  // test delete customer
  describe('deleteCustomer', () => {
    it('should call the deleteCustomer method from the service', async () => {
      // GIVEN
      const id = '1234';

      // WHEN
      const response = await controller.deleteCustomer(id);

      // THEN
      expect(mockCustomerService.deleteCustomer).toHaveBeenCalledWith(id);
    });
  });

  // test find method
  describe('find', () => {
    it('should return a pagination of customers', async () => {
      // GIVEN
      const index = 1;
      const limit = 10;
      const count = 5;
      const meta = new PaginationMetadataDto(index, limit, count);
      const pagination: PaginationDto<Customer> = {
        data: new Array(count).map((_) => customer()),
        meta: meta,
      };

      mockCustomerService.getPage
        .calledWith(index, limit)
        .mockResolvedValueOnce(pagination);

      //WHEN
      const response = await controller.find(index, limit);

      // THEN
      expect(response).toEqual(pagination);
      expect(mockCustomerService.getPage).toHaveBeenCalledWith(index, limit, {
        order: null,
        orderBy: null,
      });
    });
  });

  // test search method
  describe('Search', () => {
    it('should return a pagination of customers', async () => {
      // GIVEN
      const search = 'Bob';
      const index = 1;
      const limit = 10;
      const count = 5;
      const meta = new PaginationMetadataDto(index, limit, count);
      const pagination: PaginationDto<Customer> = {
        data: new Array(count).map((_) => customer()),
        meta: meta,
      };

      mockCustomerService.search.mockResolvedValueOnce(pagination);

      //WHEN
      const response = await controller.search(search, index, limit);

      // THEN
      expect(response).toEqual(pagination);
      expect(mockCustomerService.search).toHaveBeenCalledWith(
        search,
        index,
        limit,
      );
    });
  });
});
