import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column()
  label: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
