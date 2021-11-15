import { CartItemCreateDto } from '@app/shopping-cart/dto/cart-item/cart-item-create.dto';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';

export const cartItemDto = (): CartItem => {
  const stub = new CartItem();
  stub.quantity = 10;

  stub.product = {};

  stub.shoppingCart = {};

  return stub;
};
