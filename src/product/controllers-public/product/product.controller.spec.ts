import { ProductService } from '@app/product/services/product/product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  const productServiceMock = mock<ProductService>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
