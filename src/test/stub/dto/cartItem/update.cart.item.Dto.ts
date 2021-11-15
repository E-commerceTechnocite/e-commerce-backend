import { CustomerDto } from '@app/customer/dto/customer/customer.dto';
import { CartItemUpdateDto } from '@app/shopping-cart/dto/cart-item/cart-item-update.dto';

export const updateCartItemDto = () => {
  const stub = new CartItemUpdateDto();
  stub.quantity = 100;

  return stub;
};
