import { Module } from '@nestjs/common';
import { ParseCountryDto } from '@app/product/dto/country/country.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { Product } from '@app/product/entities/product.entity';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { Country } from '@app/product/entities/country.entity';
import { Picture } from '@app/file/entities/picture.entity';
import { ParseProductDto } from '@app/product/dto/product/product.dto';

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
  ],
  providers: [ParseCountryDto, ParseProductDto],
  exports: [ParseCountryDto, ParseProductDto, TypeOrmModule],
})
export class ProductDtoModule {}
