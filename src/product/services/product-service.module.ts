import { Module } from '@nestjs/common';
import { ProductService } from '@app/product/services/product/product.service';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { CountryService } from '@app/product/services/country/country.service';
import { TaxService } from '@app/product/services/tax/tax.service';
import { TaxRuleService } from '@app/product/services/tax-rule/tax-rule.service';
import { TaxRuleGroupService } from '@app/product/services/tax-rule-group/tax-rule-group.service';
import { GetCheckDeleteEntityIdService } from '@app/shared/services/get-check-delete-entity-id.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Product } from '@app/product/entities/product.entity';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Country } from '@app/product/entities/country.entity';
import { Picture } from '@app/file/entities/picture.entity';
import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory,
      Product,
      Tax,
      TaxRule,
      TaxRuleGroup,
      Country,
      Picture,
    ]),
    SharedModule,
    AuthModule,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    CountryService,
    TaxService,
    TaxRuleService,
    TaxRuleGroupService,
    GetCheckDeleteEntityIdService,
  ],
  exports: [
    ProductService,
    ProductCategoryService,
    CountryService,
    TaxService,
    TaxRuleService,
    TaxRuleGroupService,
    GetCheckDeleteEntityIdService,
  ],
})
export class ProductServiceModule {}