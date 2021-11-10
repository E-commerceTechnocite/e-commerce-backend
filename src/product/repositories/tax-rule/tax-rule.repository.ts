import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(TaxRule)
export class TaxRuleRepository extends GenericRepository<TaxRule> {}
