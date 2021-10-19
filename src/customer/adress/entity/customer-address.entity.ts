import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Order } from '@app/order/entities/order.entity';
import { Country } from '@app/product/entities/country.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class AddressCustomer extends EntitySchema {
  @Column()
  address?: string;

  @Column()
  zipcode?: string;

  @Column()
  city?: string;

  @Column()
  region?: string;

  // relation Address- order
  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];

  // relation Address- Customer
  @ManyToOne(() => Customer, (customer) => customer.addressCustomers)
  customer: Customer;

  // relation Address- Country
  @ManyToOne(() => Country, (country) => country.addressCustomers)
  country?: Country;
}
