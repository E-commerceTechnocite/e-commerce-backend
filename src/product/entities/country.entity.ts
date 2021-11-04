import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, Index, OneToMany } from 'typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';

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

  // relation country-CustomerAddress
  @OneToMany(
    () => AddressCustomer,
    (addressCustomer) => addressCustomer.country,
  )
  @JoinColumn({ name: 'IdCountry', referencedColumnName: 'id' })
  addressCustomers?: AddressCustomer[];
}
