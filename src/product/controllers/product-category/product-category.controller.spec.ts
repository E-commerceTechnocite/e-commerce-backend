import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from '@app/product/controllers/product-category/product-category.controller';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { mock } from 'jest-mock-extended';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;
  const service = mock<ProductCategoryService>();

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
