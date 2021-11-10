import { Module } from '@nestjs/common';
import { ProductService } from '@app/product/services/product/product.service';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { CountryService } from '@app/product/services/country/country.service';
import { TaxRuleService } from '@app/product/services/tax-rule/tax-rule.service';
import { TaxRuleGroupService } from '@app/product/services/tax-rule-group/tax-rule-group.service';
import { SharedModule } from '@app/shared/shared.module';
import { ProductRepositoryModule } from '@app/product/repositories/product-repository.module';

@Module({
  imports: [ProductRepositoryModule, SharedModule],
  providers: [
    ProductService,
    ProductCategoryService,
    CountryService,
    TaxRuleService,
    TaxRuleGroupService,
  ],
  exports: [
    ProductService,
    ProductCategoryService,
    CountryService,
    TaxRuleService,
    TaxRuleGroupService,
  ],
})
export class ProductServiceModule {}
