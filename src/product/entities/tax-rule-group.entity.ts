import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class TaxRuleGroup extends EntitySchema {
  @ApiProperty()
  @Column()
  name?: string;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.taxRuleGroup, { lazy: true })
  taxRules?: TaxRule[];

  @OneToMany(() => Product, (product) => product.taxRuleGroup, { lazy: true })
  products?: Product[];
}
