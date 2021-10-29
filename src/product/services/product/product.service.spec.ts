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
import { createProductDto, product } from '@app/test/stub';
import { id } from '@app/test/util/id';

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

      const response = await service.findAll();

      expect(response).toEqual(products);
      expect(productRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const p: Product = product();
      productRepository.findOneOrFail.mockResolvedValueOnce(p);

      const response = await service.find(p.id);

      expect(response).toEqual(p);
      expect(productRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: p.id },
        loadEagerRelations: true,
      });
    });
  });

  describe('create', () => {
    it('should use repositories for relations', async () => {
      // GIVEN
      const p = createProductDto();
      const { picturesId, taxRuleGroupId, categoryId, thumbnailId } = p;
      const taxRuleGroup = {};
      const pictures = [{ uri: '/1' }, { uri: '/2' }];
      const thumbnail = { uri: '/1' };
      const category = {};
      taxRuleGroupRepository.findOneOrFail.mockResolvedValueOnce(taxRuleGroup);
      pictureRepository.findByIds.mockResolvedValueOnce(pictures);
      pictureRepository.findOneOrFail.mockResolvedValueOnce(thumbnail);
      categoryRepository.findOneOrFail.mockResolvedValueOnce(category);

      const entity: Product = {
        ...p,
        taxRuleGroup,
        pictures,
        thumbnail,
        category,
      };
      const savedEntity = { id: id(), ...entity };
      productRepository.save.mockResolvedValueOnce(savedEntity);

      // WHEN
      const response = await service.create(p);

      // THEN
      expect(response).toEqual(savedEntity);
      expect(taxRuleGroupRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: taxRuleGroupId },
      });
      expect(pictureRepository.findByIds).toHaveBeenCalledWith(picturesId);
      expect(pictureRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: thumbnailId },
      });
      expect(categoryRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
    });
  });
});
