import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Picture } from '@app/file/entities/picture.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';

@Entity()
export class Product extends EntitySchema {
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

  @ApiProperty({ required: true })
  @Column({ type: 'int' })
  quantity?: number;

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

  @OneToMany(() => CartItem, (cardItem) => cardItem.product, { lazy: true })
  cartItems?: CartItem[];
}
