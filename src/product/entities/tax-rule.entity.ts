import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { TaxRuleGroup } from './tax-rule-group.entity';
import { Tax } from './tax.entity';

@Entity()
export class TaxRule {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiResponseProperty({ type: ()=> TaxRuleGroup })
  @ManyToOne(() => TaxRuleGroup, (taxRuleGroup) => taxRuleGroup.taxRules,{
    eager: true,
  })
  @JoinColumn({ name: 'tax_rule_group_id', referencedColumnName: 'id' })
  taxRuleGroup?: TaxRuleGroup;

  @ApiResponseProperty({ type: Tax })
  @ManyToOne(() => Tax, (tax) => tax.taxRules,{
    eager: true,
  })
  @JoinColumn({ name: 'tax_id', referencedColumnName: 'id' })
  tax: Tax;

  @ApiResponseProperty({ type: Country })
  @ManyToOne(() => Country, (country) => country.taxRules, {
    eager: true,
  })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;

  @ApiProperty({ required: true })
  @Column()
  zipCode: string;

  @ApiProperty({ required: true })
  @Column()
  behavior: number;

  @ApiProperty({ required: true })
  @Column()
  description: string;
}
