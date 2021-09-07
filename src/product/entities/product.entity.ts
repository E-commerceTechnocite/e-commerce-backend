import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { ProductCategory } from '@app/product/entities/product-category.entity';

@Entity()
export class Product {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({ required: true })
  @Column()
  title: string;

  @ApiProperty({ required: true })
  @Column()
  reference: string;

  @ApiProperty({ required: true })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ required: true })
  @Column({ type: 'float' })
  price: number;

  @ApiResponseProperty({ type: ProductCategory })
  @ManyToOne(() => ProductCategory, (category) => category.products, {
    eager: true,
  })
  @JoinColumn({ name: 'product_category_id', referencedColumnName: 'id' })
  category: ProductCategory;
}
