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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['lastName', 'firstName', 'username'], { fulltext: true })
export class Customer extends EntitySchema implements Express.User {
  @ApiProperty({ required: false })
  @Column()
  @Index({ fulltext: true })
  username: string;

  @ApiProperty({ required: false })
  @Column()
  password?: string;

  @ApiProperty({ required: false })
  @Column()
  email: string;

  @ApiProperty({ required: false })
  @Column()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @Column()
  @Index({ fulltext: true })
  firstName: string;

  @ApiProperty({ required: false })
  @Column()
  @Index({ fulltext: true })
  lastName: string;

  @ApiProperty({ required: false })
  @Column()
  gender?: Gender;

  @ApiProperty({ required: false })
  @Column({ type: 'date' })
  birthDate?: Date;

  @ApiProperty({ required: false })
  @Column()
  newsletter?: boolean;
  // Relation between customer and shopping cart

  @ApiProperty({ required: false })
  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.customer, {
    eager: true,
  })
  @JoinColumn({ name: 'shoppingCartId', referencedColumnName: 'id' })
  shoppingCart?: ShoppingCart;

  @ApiProperty({ required: false })
  @OneToMany(() => CustomerRefreshToken, (refresh) => refresh.customer)
  refreshTokens?: CustomerRefreshToken;

  // Relation between customer and order
  @ApiProperty({ required: false })
  @OneToMany(() => Order, (order) => order.customer, {
    eager: true,
  })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  orders?: Order[];

  // Relation between customer and address
  @ApiProperty({ required: false })
  @OneToMany(
    () => AddressCustomer,
    (addressCustomer) => addressCustomer.customer,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
  addressCustomers?: AddressCustomer[];

  @ApiProperty({ required: false })
  @Column({ type: 'boolean', default: () => false })
  confirmRegistration?: boolean;
}
