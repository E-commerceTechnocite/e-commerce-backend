import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { mock } from 'jest-mock-extended';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  const repository = mock<Repository<ProductCategory>>();
  const productRepository = mock<Repository<Product>>();
  const searchEngineService = mock<MysqlSearchEngineService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        { provide: getRepositoryToken(ProductCategory), useValue: repository },
        { provide: getRepositoryToken(Product), useValue: productRepository },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
      ],
    }).compile();

    service = module.get<ProductCategoryService>(ProductCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
