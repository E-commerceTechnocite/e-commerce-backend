import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from '@app/product/controllers/product-category/product-category.controller';
import {
  ProductCategoryService,
  ProductCategoryServiceInterface,
} from '@app/product/services/product-category/product-category.service';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;
  const service: ProductCategoryServiceInterface = {
    create(entity: ProductCategory | ProductCategoryDto): Promise<void> {
      return Promise.resolve(undefined);
    },
    delete(entity: ProductCategory): Promise<void> {
      return Promise.resolve(undefined);
    },
    find(id: string | number): Promise<ProductCategory> {
      return Promise.resolve(undefined);
    },
    findAll(): Promise<ProductCategory[]> {
      return Promise.resolve([]);
    },
    update(
      id: string | number,
      entity: ProductCategory | ProductCategoryDto,
    ): Promise<void> {
      return Promise.resolve(undefined);
    },
    deleteFromId(id: string | number): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [{ provide: ProductCategoryService, useValue: service }],
    }).compile();

    controller = module.get<ProductCategoryController>(
      ProductCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
