import { Picture } from '@app/file/entities/picture.entity';
import { Product } from '@app/product/entities/product.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

export const GROUP_ORDER_PRODUCT = 'group_order_product';

@Entity()
export class OrderProduct extends EntitySchema {
  @Expose({ groups: [GROUP_ORDER_PRODUCT] })
  @Column({ type: 'integer' })
  quantity?: number;

  // relation avec la table product
  // @Expose({ groups: [GROUP_ORDER_PRODUCT] })
  @ManyToOne(() => Product, (product) => product.orderProducts, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  product?: Product;

  //relation avec la table Order
  @ManyToOne(() => Order, (order) => order.orderProducts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order?: Order;

  @Column()
  title?: string;

  @Column()
  reference?: string;

  @Column({ type: 'float' })
  price?: number;
}
