import { Test, TestingModule } from '@nestjs/testing';
import { CartItemController } from './cart-item.controller';
import { mock } from 'jest-mock-extended';
import { CartItemService } from '@app/shopping-cart/services/cart-item/cart-item.service';

describe('CartItemController', () => {
  let controller: CartItemController;

  const cartItemService = mock<CartItemService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemController],
      providers: [{ provide: CartItemService, useValue: cartItemService }],
    }).compile();

    controller = module.get<CartItemController>(CartItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
