import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Gender } from './customer.enum';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { CustomerRefreshToken } from '@app/auth/customer/entities/refresh-token.entity';

@Entity()
export class Customer extends EntitySchema implements Express.User {
  @Column()
  username?: string;

  @Column()
  password?: string;

  @Column()
  email?: string;
  @Column()
  phoneNumber?: string;
  @Column()
  firstName?: string;
  @Column()
  lastName?: string;
  @Column()
  gender?: Gender;

  @Column({ type: 'date' })
  birthDate?: Date;
  @Column()
  newsletter?: boolean;
  // Relation between customer and shopping cart
  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.customer, {
    eager: true,
  })
  @JoinColumn({ name: 'shoppingCartId', referencedColumnName: 'id' })
  shoppingCart?: ShoppingCart;

  @OneToMany(() => CustomerRefreshToken, (refresh) => refresh.customer)
  refreshTokens?: CustomerRefreshToken;
}
