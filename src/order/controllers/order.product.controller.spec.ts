import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@app/product/controllers/product/product.controller';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { mock } from 'jest-mock-extended';
import { createProductDto, product, updateProductDto } from '@app/test/stub';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from '../services/order-product.service';
import { createOrderProductDto } from '@app/test/stub/dto/order-product/order-product.Dto';

describe('ProductController', () => {
  let controller: OrderProductController;

  const mockOrderProductService = mock<OrderProductService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductController],
      providers: [
        { provide: OrderProductService, useValue: mockOrderProductService },
      ],
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // test createOrderProduct method

  describe('create', () => {
    it('should call the create method from the service', async () => {
      // GIVEN
      const orderProduct = createOrderProductDto();

      // WHEN
      const response = await controller.createOrderProduct(orderProduct);

      // THEN
      expect(mockOrderProductService.createOrderProduct).toHaveBeenCalledWith(
        orderProduct,
      );
    });
  });
  // test executeOrderProduct method
  describe('executeOrderProduct', () => {
    it('should call the executeOrderProduct method from the service', async () => {
      // GIVEN
      const orderId = '9df9053c-890a-4290-a80c-138603622fd9';

      // WHEN
      const response = await controller.executeOrderProduct(orderId);

      // THEN
      expect(mockOrderProductService.executeOrderProduct).toHaveBeenCalledWith(
        orderId,
      );
    });
  });
});
