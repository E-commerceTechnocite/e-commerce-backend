import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
  let service: ProductService;
  // Mock implementation for the product repository
  let repository: Repository<Product>;
  const item: Product = {
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
        { provide: getRepositoryToken(Product), useClass: Repository },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);

    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findall', () => {
    it('should return a list of products', async () => {
      const products: Product[] = [item];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(products);
      expect(await service.findAll()).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product: Product = item;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(product);
      expect(await service.find('1')).toEqual(product);
    });
  });
});
