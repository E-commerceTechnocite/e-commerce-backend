import { EntitySchema } from '@app/shared/entities/entity-schema';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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

  @ApiProperty({ required: false })
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orderProducts?: OrderProduct[];

  // relation avec la table customer

  @ApiProperty({ required: false })
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer?: Customer;
  // relation address - order

  @ApiProperty({ required: false })
  @ManyToOne(() => AddressCustomer, (address) => address.orders)
  // @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
  address?: AddressCustomer;
}
