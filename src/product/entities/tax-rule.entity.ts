import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { TaxRuleGroup } from './tax-rule-group.entity';
import { Tax } from './tax.entity';

@Entity()
export class TaxRule {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(()=>TaxRuleGroup,(taxRuleGroup)=>taxRuleGroup.taxRules)
  taxRuleGroup : TaxRuleGroup;

  @ManyToOne(() => Tax, (tax) => tax.taxRules)
  tax: Tax;

  @ManyToOne(() => Country, (country) => country.taxRules)
  country: Country;

  @Column()
  zipCode: string;

  @Column()
  behavior: number;

  @Column()
  description: string;
}
