import { Entity, ManyToMany } from 'typeorm';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';

@Entity()
export class ShoppingCart extends EntitySchema {
  @ManyToMany(() => CartItem, (cartItem) => cartItem.shoppingCart)
  cartItems: CartItem[];
}
