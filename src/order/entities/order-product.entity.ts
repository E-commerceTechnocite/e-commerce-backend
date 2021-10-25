import { Product } from '@app/product/entities/product.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct extends EntitySchema {
  @Column({ type: 'integer' })
  quantity?: number;

  // relation avec la table product
  @ManyToOne(() => Product, (product) => product.orderProducts)
  product?: Product;

  //relation avec la table Order

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order?: Order;
}
