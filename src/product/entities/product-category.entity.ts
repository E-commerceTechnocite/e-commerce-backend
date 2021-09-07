import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class ProductCategory {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  label: string;

  @OneToMany(() => Product, (product) => product.category, { lazy: true })
  products?: Product[];
}
