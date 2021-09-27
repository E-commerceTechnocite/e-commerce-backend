import { Module } from '@nestjs/common';
import { ShoppingCartControllerModule } from '@app/shopping-cart/controller/shopping-cart-controller.module';

@Module({ imports: [ShoppingCartControllerModule] })
export class ShoppingCartModule {}
