import { Module } from '@nestjs/common';
import { CountryController } from '@app/product/controllers/country/country.controller';
import { ProductController } from '@app/product/controllers/product/product.controller';
import { ProductCategoryController } from '@app/product/controllers/product-category/product-category.controller';
import { TaxController } from '@app/product/controllers/tax/tax.controller';
import { TaxRuleController } from '@app/product/controllers/tax-rule/tax-rule.controller';
import { TaxRuleGroupController } from '@app/product/controllers/tax-rule-group/tax-rule-group.controller';
import { ProductServiceModule } from '@app/product/services/product-service.module';

@Module({
  imports: [ProductServiceModule],
  controllers: [
    CountryController,
    ProductController,
    ProductCategoryController,
    TaxController,
    TaxRuleController,
    TaxRuleGroupController,
  ],
})
export class ProductControllerModule {}
