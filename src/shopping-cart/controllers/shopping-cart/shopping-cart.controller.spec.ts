import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ShoppingCartController } from './shopping-cart.controller';

describe('ShoppingCartController', () => {
  let controller: ShoppingCartController;
  const shoppingCartService = mock<ShoppingCartService>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartController],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartService },
      ],
    }).compile();

    controller = module.get<ShoppingCartController>(ShoppingCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
