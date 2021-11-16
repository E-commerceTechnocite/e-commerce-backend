import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { shoppingCart } from '@app/test/stub/entities/shopping-cart';
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
    })
      .overrideProvider(ShoppingCartService)
      .useValue(shoppingCartService)
      .compile();

    controller = module.get<ShoppingCartController>(ShoppingCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // test findOne Item method
  describe('findOneItem', () => {
    it('should return a string', async () => {
      // GIVEN
      const sc = shoppingCart();
      const result = 'return one item with this id';

      // WHEN
      const response = await controller.findOneItem(sc.id);

      // THEN
      expect(response).toEqual(result);
    });
  });

  // test findAllItems method
  describe('findAllItems', () => {
    it('should return a string', async () => {
      // GIVEN
      const sc = shoppingCart();
      const result = 'all items';

      // WHEN
      const response = await controller.findAllItems();

      // THEN
      expect(response).toEqual(result);
    });
  });
});
