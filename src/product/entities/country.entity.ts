import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaxRule } from './tax-rule.entity';

@Entity()
export class Country {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({ required: true })
  @Column()
  name: string;

  @ApiProperty({ required: true })
  @Column()
  code: string;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.country, { lazy: true })
  taxRules?: TaxRule[];
}
