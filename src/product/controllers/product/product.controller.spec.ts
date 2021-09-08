import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@app/product/controllers/product/product.controller';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { PaginationDto } from '@app/dto/pagination/pagination.dto';
import { mock } from 'jest-mock-extended';

describe('ProductController', () => {
  let controller: ProductController;

  const service = mock<ProductService>();

  const productStub: Product = {
    category: undefined,
    price: 39.99,
    reference: '1234',
    title: 'title',
    id: '1',
    description: 'description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: service }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('should return an pagination of products', async () => {
      const pagination: PaginationDto<Product> = {
        data: [productStub],
        meta: {
          currentPage: 1,
          limit: 1,
          maxPages: 1,
          prevPage: null,
          nextPage: null,
        },
      };
      await service.getPage(1, 10);
      await service.getPage.mockResolvedValue(pagination);
      expect(await controller.find()).toEqual(pagination);
      expect(service.getPage).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findById', () => {
    it('should return one product', async () => {
      const product = productStub;
      await service.find.mockResolvedValueOnce(product);
      await service.find('1');
      expect(await controller.findById('1')).toEqual(product);
      expect(service.find).toHaveBeenCalledWith('1');
    });
  });
});
