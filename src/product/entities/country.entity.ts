import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class Country extends EntitySchema {
  @ApiProperty({ required: true })
  @Column()
  name?: string;

  @ApiProperty({ required: true })
  @Column()
  code?: string;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.country, { lazy: true })
  taxRules?: TaxRule[];
}
