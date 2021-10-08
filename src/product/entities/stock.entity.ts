import { EntitySchema } from '@app/shared/entities/entity-schema';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Stock extends EntitySchema {
  @ApiProperty({ required: false })
  @Column({ default: 0 })
  physical?: number;

  @ApiProperty({ required: false })
  @Column({ default: 0 })
  incoming?: number;

  @ApiProperty({ required: false })
  @Column({ default: 0 })
  pending?: number;

  @OneToOne(() => Product, (product) => product.stock)
  product?: Product;
}
