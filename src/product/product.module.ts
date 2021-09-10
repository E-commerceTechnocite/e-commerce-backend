import { Module } from '@nestjs/common';
import { ProductController } from '@app/product/controllers/product/product.controller';
import { ProductService } from '@app/product/services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductCategoryController } from '@app/product/controllers/product-category/product-category.controller';
import { SharedModule } from '@app/shared/shared.module';
import { CountryController } from './controllers/country/country.controller';
import { TaxController } from './controllers/tax/tax.controller';
import { TaxRuleController } from './controllers/tax-rule/tax-rule.controller';
import { TaxRuleGroupController } from './controllers/tax-rule-group/tax-rule-group.controller';
import { CountryService } from './services/country/country.service';
import { TaxService } from './services/tax/tax.service';
import { TaxRuleService } from './services/tax-rule/tax-rule.service';
import { TaxRuleGroupService } from './services/tax-rule-group/tax-rule-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Product]), SharedModule],
  controllers: [ProductController, ProductCategoryController, CountryController, TaxController, TaxRuleController, TaxRuleGroupController],
  providers: [ProductService, ProductCategoryService, CountryService, TaxService, TaxRuleService, TaxRuleGroupService],
  exports: [ProductService, ProductCategoryService],
})
export class ProductModule {}
