import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaxRule } from './tax-rule.entity';

Entity();
export class Tax {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({ required: true })
  @Column()
  rate: number;

  @OneToMany(() => TaxRule, (taxRule) => taxRule.tax)
  taxRules: TaxRule[];
}
