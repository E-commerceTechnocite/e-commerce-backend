import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaxRule } from './tax-rule.entity';

@Entity()
export class TaxRuleGroup {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @OneToMany(()=>TaxRule,(taxRule)=>taxRule.taxRuleGroup)
  taxRules ?: TaxRule[];
}
