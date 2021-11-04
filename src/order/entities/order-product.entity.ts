import { Product } from '@app/product/entities/product.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct extends EntitySchema {
  @ApiProperty({ required: false })
  @Column({ type: 'integer' })
  quantity?: number;

  // relation avec la table product

  @ApiProperty({ type: () => Product, required: false })
  @ManyToOne(() => Product, (product) => product.orderProducts)
  product?: Product;

  //relation avec la table Order

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn()
  order?: Order;
}
