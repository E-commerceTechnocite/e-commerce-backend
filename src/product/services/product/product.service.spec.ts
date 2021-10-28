import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { mock } from 'jest-mock-extended';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Picture } from '@app/file/entities/picture.entity';

describe('ProductService', () => {
  let service: ProductService;
  const productRepository = mock<Repository<Product>>();
  const categoryRepository = mock<Repository<ProductCategory>>();
  const taxRuleGroupRepository = mock<Repository<TaxRuleGroup>>();
  const pictureRepository = mock<Repository<Picture>>();

  const productStub: Product = {
    category: undefined,
    title: 'title',
    reference: '1234',
    price: 39.99,
    description: 'description',
    id: '1',
  };

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
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const products: Product[] = [productStub];
      productRepository.find.mockResolvedValueOnce(products);
      expect(await service.findAll()).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product: Product = productStub;
      productRepository.findOneOrFail.mockResolvedValueOnce(product);
      expect(await service.find('1')).toEqual(product);
    });
  });
});
