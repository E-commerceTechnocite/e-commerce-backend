import { Module } from '@nestjs/common';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { CartItemService } from './cart-item/cart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Product } from '@app/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, CartItem, Product])],
  providers: [ShoppingCartService, CartItemService],
  exports: [ShoppingCartService, CartItemService],
})
export class ShoppingCartServiceModule {}
