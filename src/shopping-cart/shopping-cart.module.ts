import { Module } from '@nestjs/common';
import { ShoppingCartControllerModule } from '@app/shopping-cart/controllers/shopping-cart-controller.module';

@Module({ imports: [ShoppingCartControllerModule] })
export class ShoppingCartModule {}
