import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@app/product/controllers/product/product.controller';
import {
  ProductService,
  ProductServiceInterface,
} from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ProductDto } from '@app/product/dto/product/product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  // Mock implementation of the product service
  const service: ProductServiceInterface = {
    create(
      entity: Product | ProductDto,
    ): Promise<void> | Promise<Product> | Promise<InsertResult> {
      return Promise.resolve(undefined);
    },
    delete(entity: Product): Promise<void> | Promise<DeleteResult> {
      return Promise.resolve(undefined);
    },
    find(id: string | number): Promise<Product> | Product {
      return undefined;
    },
    findAll(): Product[] | Promise<Product[]> {
      return undefined;
    },
    update(
      id: string | number,
      entity: Product | ProductDto,
    ): Promise<void> | Promise<Product> | Promise<UpdateResult> {
      return Promise.resolve(undefined);
    },
    deleteFromId(id: string | number): Promise<void> | Promise<DeleteResult> {
      return Promise.resolve(undefined);
    },
  };
  const item: Product = {
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
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(service)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findall', () => {
    it('should return an array of products', async () => {
      const product = item;
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([product]);
      expect(await controller.findAll()).toEqual([product]);
    });
  });
});
