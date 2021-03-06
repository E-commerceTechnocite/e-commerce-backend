import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from '@app/product/entities/country.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class TaxRule extends EntitySchema {
  @ApiResponseProperty({ type: () => TaxRuleGroup })
  @ManyToOne(() => TaxRuleGroup, (taxRuleGroup) => taxRuleGroup.taxRules, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  taxRuleGroup?: TaxRuleGroup;

  @ApiProperty({ required: true })
  @Column()
  tax?: number;

  @ApiResponseProperty({ type: () => Country })
  @ManyToOne(() => Country, (country) => country.taxRules, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  country?: Country;

  @ApiProperty({ required: true })
  @Column()
  zipCode?: string;

  @ApiProperty({ required: true })
  @Column()
  behavior?: number;

  @ApiProperty({ required: true })
  @Column()
  description?: string;
}
