import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Gender } from './customer.enum';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

import { Order } from '@app/order/entities/order.entity';
import { CustomerRefreshToken } from '@app/auth/customer/entities/refresh-token.entity';
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';

@Entity()
@Index(['lastName', 'firstName', 'username'], { fulltext: true })
export class Customer extends EntitySchema implements Express.User {
  @Column()
  @Index({ fulltext: true })
  username: string;

  @Column()
  password?: string;

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

  // Relation between customer and order
  @OneToMany(() => Order, (order) => order.customer, {
    eager: true,
  })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  orders?: Order[];

  // Relation between customer and address
  @OneToMany(
    () => AddressCustomer,
    (addressCustomer) => addressCustomer.customer,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
  addressCustomers?: AddressCustomer[];
  @Column({ type: 'boolean', default: () => false })
  confirmRegistration?: boolean;
}
