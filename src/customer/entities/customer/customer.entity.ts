import { Type } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from './customer.enum';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { CustomerRefreshToken } from '@app/auth/customer/refresh-token.entity';
@Entity()
export class Customer extends EntitySchema {
  /*  @PrimaryGeneratedColumn() 
    id: string;  */
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
  @Column()
  phoneNumber: string;
  @Column()
  firstName: string;
  @Column()
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
}
