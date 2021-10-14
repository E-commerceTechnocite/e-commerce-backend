import { Module } from '@nestjs/common';
import { ShoppingCartController } from '@app/shopping-cart/controllers/shopping-cart/shopping-cart.controller';
import { ShoppingCartServiceModule } from '@app/shopping-cart/services/shopping-cart-service.module';
import { CartItemController } from './cart-item/cart-item.controller';
import { CustomerGuardModule } from '@app/auth/customer/guard/customer-guard.module';

@Module({
  controllers: [ShoppingCartController, CartItemController],
  imports: [ShoppingCartServiceModule, CustomerGuardModule],
})
export class ShoppingCartControllerModule {}
