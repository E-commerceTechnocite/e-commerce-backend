import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class ProductCategory extends EntitySchema {
  @ApiProperty()
  @Column()
  label?: string;

  @OneToMany(() => Product, (product) => product.category, { lazy: true })
  products?: Product[];
}
