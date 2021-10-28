import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { mock } from 'jest-mock-extended';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let repository = mock<Repository<ProductCategory>>();
  let productRepository = mock<Repository<Product>>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        { provide: getRepositoryToken(ProductCategory), useValue: repository },
        { provide: getRepositoryToken(Product), useValue: productRepository },
      ],
    }).compile();

    service = module.get<ProductCategoryService>(ProductCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
