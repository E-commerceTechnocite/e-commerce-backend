import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
@Index('country_fulltext_index', ['name', 'code'], { fulltext: true })
export class Country extends EntitySchema {
  @ApiProperty({ required: true })
  @Column()
  @Index({ fulltext: true })
  name?: string;

  @ApiProperty({ required: true })
  @Column()
  @Index({ fulltext: true })
  code?: string;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.country, { lazy: true })
  taxRules?: TaxRule[];
}
