import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { Repository } from 'typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let repository: Repository<ProductCategory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        { provide: getRepositoryToken(ProductCategory), useClass: Repository },
      ],
    }).compile();

    repository = module.get<Repository<ProductCategory>>(
      getRepositoryToken(ProductCategory),
    );
    service = module.get<ProductCategoryService>(ProductCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
