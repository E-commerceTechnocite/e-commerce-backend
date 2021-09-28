import { Entity, ManyToMany, OneToOne } from 'typeorm';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';

@Entity()
export class ShoppingCart extends EntitySchema {
  @ManyToMany(() => CartItem, (cartItem) => cartItem.shoppingCart)
  cartItems?: CartItem[];

  // TODO need customer implementation
   @OneToOne(() => Customer, (customer) => customer.shoppingCart)
   customer?: Customer;
}
