import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class Tax extends EntitySchema {
  @ApiProperty({ required: true })
  @Column()
  rate?: number;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.tax)
  taxRules?: TaxRule[];
}
