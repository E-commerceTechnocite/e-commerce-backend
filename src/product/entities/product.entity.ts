import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { TaxRuleGroup } from './tax-rule-group.entity';
import { Picture } from '@app/file/entities/picture.entity';

@Entity()
export class Product {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({ required: true })
  @Column()
  title?: string;

  @ApiProperty({ required: true })
  @Column()
  reference?: string;

  @ApiProperty({ required: true })
  @Column({ type: 'text' })
  description?: string;

  @ApiProperty({ required: true })
  @Column({ type: 'float' })
  price?: number;

  @ApiResponseProperty({ type: () => ProductCategory })
  @ManyToOne(() => ProductCategory, (category) => category.products, {
    eager: true,
  })
  @JoinColumn({ name: 'product_category_id', referencedColumnName: 'id' })
  category?: ProductCategory;

  @ApiResponseProperty({ type: () => TaxRuleGroup })
  @ManyToOne(() => TaxRuleGroup, (taxRuleGroup) => taxRuleGroup.products, {
    eager: true,
  })
  @JoinColumn({ name: 'tax_rule_group_id', referencedColumnName: 'id' })
  taxRuleGroup?: TaxRuleGroup;

  @ManyToMany(() => Picture, (picture) => picture.products, {
    eager: true,
  })
  @JoinTable({
    name: 'product_pictures',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'picture_id', referencedColumnName: 'id' },
  })
  pictures?: Picture[];

  @ManyToOne(() => Picture, (picture) => picture.productThumbnail, {
    eager: true,
  })
  @JoinColumn({ name: 'picture_thumbnail_id', referencedColumnName: 'id' })
  thumbnail?: Picture;
}
