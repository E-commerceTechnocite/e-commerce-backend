import { Module } from '@nestjs/common';
import { ShoppingCartControllerModule } from '@app/shopping-cart/controllers/shopping-cart-controller.module';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingCart]),
    ShoppingCartControllerModule,
  ],
  providers: [],
})
export class ShoppingCartModule {}
