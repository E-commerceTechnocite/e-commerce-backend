import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@app/product/controllers/product/product.controller';
import {
  ProductService,
  ProductServiceInterface,
} from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { ProductDto } from '@app/product/dto/product/product.dto';
import { PaginationDto } from '@app/dto/pagination/pagination.dto';
import { PaginationOptions } from '@app/interfaces/paginator.interface';

describe('ProductController', () => {
  let controller: ProductController;
  // Mock implementation of the product service
  const service: ProductServiceInterface = {
    getPage(
      index: number,
      limit: number,
      opts: PaginationOptions | undefined,
    ): Promise<PaginationDto<Product>> {
      return Promise.resolve(undefined);
    },
    create(entity: Product | ProductDto): Promise<void> {
      return Promise.resolve(undefined);
    },
    delete(entity: Product): Promise<void> {
      return Promise.resolve(undefined);
    },
    find(id: string | number): Promise<Product> {
      return Promise.resolve(undefined);
    },
    findAll(): Promise<Product[]> {
      return Promise.resolve([]);
    },
    update(id: string | number, entity: Product | ProductDto): Promise<void> {
      return Promise.resolve(undefined);
    },
    deleteFromId(id: string | number): Promise<void> {
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

  describe('find', () => {
    it('should return an array of products', async () => {
      const pagination: PaginationDto<Product> = {
        data: [item],
        meta: {
          currentPage: 1,
          limit: 1,
          maxPages: 1,
          prevPage: null,
          nextPage: null,
        },
      };
      jest.spyOn(service, 'getPage').mockResolvedValueOnce(pagination);
      expect(await controller.find()).toEqual(pagination);
    });
  });
});
