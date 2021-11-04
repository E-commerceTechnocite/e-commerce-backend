import { Column, Entity, ManyToOne } from 'typeorm';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Product } from '@app/product/entities/product.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartItem extends EntitySchema {
  @ApiProperty({ required: false })
  @Column({ type: 'integer' })
  quantity: number;

  @ApiProperty({ type: () => Product, required: false })
  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.cartItems)
  shoppingCart: ShoppingCart;
}
