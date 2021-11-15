import { Test, TestingModule } from '@nestjs/testing';
import { CartItemController } from './cart-item.controller';
import { mock } from 'jest-mock-extended';
import { CartItemService } from '@app/shopping-cart/services/cart-item/cart-item.service';
import { cartItem } from '@app/test/stub/entities/cart-item';
import { updateCartItemDto } from '@app/test/stub/dto/cartItem/update.cart.item.Dto';
import { cartItemDto } from '@app/test/stub/dto/cartItem/cart.Item.Dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';

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

  // test find method

  describe('find', () => {
    it('should return one cartItem', async () => {
      // GIVEN
      const c = cartItemDto();
      cartItemService.find.mockResolvedValue(c);

      // WHEN
      const response = await controller.find(c.id);

      // THEN
      expect(response).toEqual(c);
      expect(cartItemService.find).toHaveBeenCalledWith(c.id);
    });
  });

  // Test paginate method

  describe('paginate', () => {
    it('should return an pagination of cartItem', async () => {
      // GIVEN
      const page = 1;
      const limit = 10;
      const count = 5;
      const meta = new PaginationMetadataDto(page, limit, count);
      const pagination: PaginationDto<CartItem> = {
        data: new Array(count).map((_) => cartItemDto()),
        meta: meta,
      };
      cartItemService.getPage
        .calledWith(page, limit)
        .mockResolvedValue(pagination);
      //const id = '123';
      //WHEN
      const response = await controller.paginate();

      // THEN
      expect(response).toEqual(pagination);
      expect(cartItemService.getPage).toHaveBeenCalledWith(page, limit, {
        orderBy: null,
      });
    });
  });

  //Test create method
  describe('create', () => {
    it('should call the create method from the service', async () => {
      // GIVEN
      const c = cartItem();

      // WHEN
      const response = await controller.create(c);

      // THEN
      expect(cartItemService.create).toHaveBeenCalledWith(c);
    });
  });

  // Test update method
  describe('update', () => {
    it('should call the update method from the service', async () => {
      // GIVEN
      const id = '1234';
      const ci = updateCartItemDto();

      // WHEN
      const response = await controller.update(id, ci);

      // THEN
      expect(cartItemService.update).toHaveBeenCalledWith(id, ci);
    });
  });

  // Test delete method
  describe('delete', () => {
    it('should call the delete method from the service', async () => {
      // GIVEN
      const id = '1234';

      // WHEN
      const response = await controller.delete(id);

      // THEN
      expect(cartItemService.deleteFromId).toHaveBeenCalledWith(id);
    });
  });
});
