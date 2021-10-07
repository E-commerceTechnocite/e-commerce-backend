import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ShoppingCartDto {
  @ApiProperty()
  @IsUUID()
  cartItems?: CartItem[];

  @ApiProperty()
  @IsUUID()
  customer?: Customer;
}
