import { EntitySchema } from '@app/shared/entities/entity-schema';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderProduct } from './order-product.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';

@Entity()
export class Order extends EntitySchema {
  @ApiProperty({ required: true })
  @Column()
  status?: number = 0; // enum

  @ApiProperty({ required: false })
  @Column()
  paymentType?: number = 0; //enum

  // relation avec la table orderProduct
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  orderProducts?: OrderProduct[];

  // relation avec la table customer
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer?: Customer;
  // relation address - order
  @ManyToOne(() => AddressCustomer, (address) => address.orders)
  // @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
  address?: AddressCustomer;
}
