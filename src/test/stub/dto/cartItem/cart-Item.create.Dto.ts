import { CartItemCreateDto } from '@app/shopping-cart/dto/cart-item/cart-item-create.dto';

export const createCartItemDto = (): CartItemCreateDto => {
  const stub = new CartItemCreateDto();
  stub.quantity = 10;
  stub.productId = '007eb95c-e6a1-48ee-8f4c-ab2c64368b73';

  return stub;
};
