import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { id } from '@app/test/util/id';

export const taxRuleGroup = (): TaxRuleGroup => ({
  id: id(),
  name: 'TaxRuleGroup55',
  taxRules: undefined,
  products: undefined,
});
