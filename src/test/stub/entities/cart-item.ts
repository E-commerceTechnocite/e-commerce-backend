import { CartItemCreateDto } from '@app/shopping-cart/dto/cart-item/cart-item-create.dto';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { id } from '@app/test/util/id';

export const cartItem = (): CartItemCreateDto => ({
  //id: id(),
  quantity: 10,

  productId: '007eb95c-e6a1-48ee-8f4c-ab2c64368b73',
});
