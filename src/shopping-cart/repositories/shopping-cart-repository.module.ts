import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { CartItemRepository } from '@app/shopping-cart/repositories/cart-item/cart-item.repository';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Product } from '@app/product/entities/product.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCart,
      CartItem,
      Product,
      Customer,
      CartItemRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ShoppingCartRepositoryModule {}
