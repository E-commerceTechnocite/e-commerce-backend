import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';

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

  // relation country-CustomerAddress
  @OneToMany(
    () => AddressCustomer,
    (addressCustomer) => addressCustomer.country,
  )
  @JoinColumn({ name: 'IdCountry', referencedColumnName: 'id' })
  addressCustomers?: AddressCustomer[];
}
