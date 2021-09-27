import { Module } from '@nestjs/common';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { CartItemService } from './cart-item/cart-item.service';

@Module({
  providers: [ShoppingCartService, CartItemService],
  exports: [ShoppingCartService, CartItemService],
})
export class ShoppingCartServiceModule {}
