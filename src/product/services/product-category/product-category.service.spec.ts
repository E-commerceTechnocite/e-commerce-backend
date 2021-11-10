import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { ProductCategoryRepository } from '@app/product/repositories/product-category/product-category.repository';
import { ProductRepository } from '@app/product/repositories/product/product.repository';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  const repository = mock<ProductCategoryRepository>();
  const productRepository = mock<ProductRepository>();
  const searchEngineService = mock<MysqlSearchEngineService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        {
          provide: getRepositoryToken(ProductCategoryRepository),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(ProductRepository),
          useValue: productRepository,
        },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
      ],
    }).compile();

    service = module.get<ProductCategoryService>(ProductCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
