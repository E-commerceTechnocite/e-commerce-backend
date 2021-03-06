import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, mockFn } from 'jest-mock-extended';
import { Picture } from '@app/file/entities/picture.entity';
import { createProductDto, product, updateProductDto } from '@app/test/stub';
import * as metaphone from 'talisman/phonetics/metaphone';
import { id } from '@app/test/util/id';
import { JSDOM } from 'jsdom';
import { ProductRepository } from '@app/product/repositories/product/product.repository';
import { ProductCategoryRepository } from '@app/product/repositories/product-category/product-category.repository';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';

describe('ProductService', () => {
  let service: ProductService;
  const productRepository = mock<ProductRepository>();
  const categoryRepository = mock<ProductCategoryRepository>();
  const taxRuleGroupRepository = mock<TaxRuleGroupRepository>();
  const pictureRepository = mock<Repository<Picture>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductRepository),
          useValue: productRepository,
        },
        {
          provide: getRepositoryToken(ProductCategoryRepository),
          useValue: categoryRepository,
        },
        {
          provide: getRepositoryToken(TaxRuleGroupRepository),
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
      const products: Product[] = [product()];

      const returnResponse = products.map((p) => ({
        id: p.id,
        detail: `${p.title} , ${p.price}`,
      }));

      const qb = mock<SelectQueryBuilder<Product>>({
        select: mockFn().mockReturnThis(),
        addSelect: mockFn().mockReturnThis(),
        execute: mockFn().mockResolvedValueOnce(returnResponse),
      });

      productRepository.createQueryBuilder.mockReturnValueOnce(qb);

      const response = await service.findAll();

      expect(response).toEqual(returnResponse);
      expect(productRepository.createQueryBuilder).toHaveBeenCalledWith(
        'product',
      );
      expect(qb.select).toHaveBeenCalledWith('product.id');
      expect(qb.select.mock.calls.length).toEqual(1);
      expect(qb.addSelect).toHaveBeenLastCalledWith(
        "CONCAT(product.title,' ',product.price)",
        'detail',
      );
      expect(qb.addSelect.mock.calls.length).toEqual(1);
      expect(qb.execute).toHaveBeenCalled();
      expect(qb.execute.mock.calls.length).toEqual(1);
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

  describe('update', () => {
    it('should accept a dto with no relations', async () => {
      const p = updateProductDto();
      const entity = product();
      p.picturesId = [];
      p.taxRuleGroupId = undefined;
      p.categoryId = undefined;
      p.thumbnailId = undefined;
      productRepository.findOneOrFail.mockResolvedValueOnce(entity);

      const strippedDesc = new JSDOM(p.description)?.window.document.body
        .textContent;

      const updatedEntity: Product = {
        ...entity,
        ...p,
        stock: {
          ...entity.stock,
          ...p.stock,
        },
        metaphoneTitle: p.title?.split(' ').map(metaphone).join(' '),
        metaphoneDescription: strippedDesc.split(' ').map(metaphone).join(' '),
        strippedDescription: strippedDesc,
        category: undefined,
        taxRuleGroup: undefined,
        pictures: undefined,
        thumbnail: undefined,
      };
      for (const key of Object.keys(updatedEntity)) {
        if (key.match(/.*Id$/)) {
          delete updatedEntity[key];
        }
      }
      productRepository.save.mockResolvedValueOnce(updatedEntity);

      const response = await service.update(entity.id, p);

      expect(response).toBeUndefined();
      expect(productRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: entity.id },
      });
      expect(productRepository.save).toHaveBeenCalledWith(updatedEntity);
    });
  });

  describe('delete', () => {
    it('should', async () => {
      const id = '1234';
      const result: DeleteResult = { affected: 1, raw: {} };
      productRepository.delete.mockResolvedValueOnce(result);

      const response = await service.deleteFromId(id);

      expect(response).toBeUndefined();
      expect(productRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
