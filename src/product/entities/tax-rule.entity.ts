import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { TaxRuleGroup } from './tax-rule-group.entity';
import { Tax } from './tax.entity';

@Entity()
export class TaxRule {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(()=>TaxRuleGroup,(taxRuleGroup)=>taxRuleGroup.taxRules, {
    eager: true,
  })
  @JoinColumn({ name: 'tax_rule_group_id', referencedColumnName: 'id' })
  taxRuleGroup : TaxRuleGroup;

  @ManyToOne(() => Tax, (tax) => tax.taxRules, {
    eager: true,
  })
  @JoinColumn({ name: 'tax_id', referencedColumnName: 'id' })
  tax: Tax;

  @ManyToOne(() => Country, (country) => country.taxRules, {
    eager: true,
  })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;

  @Column()
  zipCode: string;

  @Column()
  behavior: number;

  @Column()
  description: string;
}
