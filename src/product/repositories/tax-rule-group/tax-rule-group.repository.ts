import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(TaxRuleGroup)
export class TaxRuleGroupRepository extends GenericRepository<TaxRuleGroup> {}
