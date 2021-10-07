import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ShoppingCartUpdateDto {
  @ApiProperty()
  @IsUUID()
  cartItems?: CartItem[];
}
