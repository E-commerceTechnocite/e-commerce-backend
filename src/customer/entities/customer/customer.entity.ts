import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { Gender } from './customer.enum';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { CustomerRefreshToken } from '@app/auth/customer/entities/refresh-token.entity';

@Entity()
@Index(['lastName', 'firstName', 'username'], { fulltext: true })
export class Customer extends EntitySchema {
  @Column()
  @Index({ fulltext: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  @Index({ fulltext: true })
  firstName: string;

  @Column()
  @Index({ fulltext: true })
  lastName: string;

  @Column()
  gender: Gender;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  newsletter: boolean;

  // Relation between customer and shopping cart
  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.customer)
  shoppingCart?: ShoppingCart;

  @OneToMany(() => CustomerRefreshToken, (refresh) => refresh.customer)
  refreshTokens?: CustomerRefreshToken;

  @Column({ type: 'boolean', default: () => false })
  confirmRegistration?: boolean;
}
