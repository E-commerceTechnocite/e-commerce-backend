import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { mock } from 'jest-mock-extended';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Picture } from '@app/file/entities/picture.entity';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { product } from '@app/test/stub';

describe('ProductService', () => {
  let service: ProductService;
  const productRepository = mock<Repository<Product>>();
  const categoryRepository = mock<Repository<ProductCategory>>();
  const taxRuleGroupRepository = mock<Repository<TaxRuleGroup>>();
  const pictureRepository = mock<Repository<Picture>>();
  const searchEngineService = mock<MysqlSearchEngineService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getRepositoryToken(Product), useValue: productRepository },
        {
          provide: getRepositoryToken(ProductCategory),
          useValue: categoryRepository,
        },
        {
          provide: getRepositoryToken(TaxRuleGroup),
          useValue: taxRuleGroupRepository,
        },
        {
          provide: getRepositoryToken(Picture),
          useValue: pictureRepository,
        },
        {
          provide: MysqlSearchEngineService,
          useValue: searchEngineService,
        },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const products: Product[] = [product()];
      productRepository.find.mockResolvedValueOnce(products);
      expect(await service.findAll()).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const p: Product = product();
      productRepository.findOneOrFail.mockResolvedValueOnce(p);
      expect(await service.find('1')).toEqual(p);
    });
  });
});
