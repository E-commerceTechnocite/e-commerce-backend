import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { TaxRule } from './tax-rule.entity';

@Entity()
export class TaxRuleGroup {

  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(()=>TaxRule,(taxRule)=>taxRule.taxRuleGroup)
  taxRules ?: TaxRule[];

  @OneToMany(()=> Product, (product)=> product.taxRuleGroup)
  products ?: Product[];
}
