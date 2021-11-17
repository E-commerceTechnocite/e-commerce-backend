import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressController } from './adress-customer.controller';
import { CustomerAddressService } from '../service/customer-address.service';
import { createCustomerAddressDto } from '@app/test/stub/dto/address/create-customer-address.dto';
import { mock } from 'jest-mock-extended';
import { adresse } from '@app/test/stub/entities/adresse';
import { updateAddressDto } from '@app/test/stub/dto/address/update-Address.Dto';
import { AddressCustomer } from '../entity/customer-address.entity';

describe('CustomerController', () => {
  let controller: CustomerAddressController;

  const mockCustomerAddressService = mock<CustomerAddressService>();
  //const mockShoppingCartService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAddressController],
      providers: [CustomerAddressService],
    })
      .overrideProvider(CustomerAddressService)
      .useValue(mockCustomerAddressService)
      .compile();

    controller = module.get<CustomerAddressController>(
      CustomerAddressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // test createAddress method
  describe('createAddressCustomer', () => {
    it("should create a customer'address", async () => {
      // GIVEN
      const ad = createCustomerAddressDto();

      // WHEN
      const response = await controller.createAddress(ad);

      // THEN
      expect(
        mockCustomerAddressService.createCustomerAddress,
      ).toHaveBeenCalledWith(ad);
    });
  });
  // test getAddress by id method

  describe('getAddressById', () => {
    it('should return one customer address', async () => {
      // GIVEN
      const ad = adresse();
      mockCustomerAddressService.getAddressCustomer.mockResolvedValue(ad);

      // WHEN
      const response = await controller.getAddressById(ad.id);

      // THEN
      expect(response).toEqual(ad);
      expect(
        mockCustomerAddressService.getAddressCustomer,
      ).toHaveBeenCalledWith(ad.id);
    });
  });
  // test getAllOfAddress method

  describe('getAllAddressOfCustomer', () => {
    it('should return an array of addresses', async () => {
      const result = AddressCustomer['test'];
      mockCustomerAddressService.getAllAddressCustomer.mockResolvedValue(
        result,
      );

      expect(await controller.getAllAddressOfCustomer()).toBe(result);
    });
  });

  //test update address customer
  describe('updatAddtressCustomer', () => {
    it('should call the update method from the service', async () => {
      // GIVEN
      const id = '1234';
      const p = updateAddressDto();

      // WHEN
      const response = await controller.updateAddressCustomer(p, id);

      // THEN
      expect(
        mockCustomerAddressService.updateCustomerAddress,
      ).toHaveBeenCalledWith(p, id);
    });
  });
  // delete address customer
  describe('deleteAddress', () => {
    it('should call the delete method from the service', async () => {
      // GIVEN
      const id = '1234';

      // WHEN
      const response = await controller.deleteAddressCustomer(id);

      // THEN
      expect(
        mockCustomerAddressService.deleteAddressCustomer,
      ).toHaveBeenCalledWith(id);
    });
  });
});
