import { Module } from '@nestjs/common';
import { ProductRepository } from '@app/product/repositories/product/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Product } from '@app/product/entities/product.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Country } from '@app/product/entities/country.entity';
import { Picture } from '@app/file/entities/picture.entity';
import { Stock } from '@app/product/entities/stock.entity';
import { CountryRepository } from '@app/product/repositories/country/country.repository';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';
import { ProductCategoryRepository } from '@app/product/repositories/product-category/product-category.repository';
import { TaxRuleGroupRepository } from '@app/product/repositories/tax-rule-group/tax-rule-group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory,
      Product,
      TaxRule,
      TaxRuleGroup,
      Country,
      Picture,
      Stock,
      ProductRepository,
      CountryRepository,
      ProductCategoryRepository,
      TaxRuleRepository,
      TaxRuleGroupRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ProductRepositoryModule {}
