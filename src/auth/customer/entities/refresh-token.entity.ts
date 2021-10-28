import { Customer } from '@app/customer/entities/customer/customer.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class CustomerRefreshToken extends EntitySchema {
  @Column({ type: 'text' })
  value?: string;

  @Column({ default: '' })
  userAgent?: string = '';

  @ManyToOne(() => Customer, (customer) => customer.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: Customer;
}
