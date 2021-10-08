import { Column, Entity, ManyToOne } from 'typeorm';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Product } from '@app/product/entities/product.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';

@Entity()
export class CartItem extends EntitySchema {
  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.cartItems)
  shoppingCart: ShoppingCart;
}
