import { ConsoleLogger, Module } from '@nestjs/common';
import { FixturesService } from '@app/console/fixtures/fixtures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductFixturesService } from '@app/console/fixtures/product/product-fixtures.service';
import { User } from '@app/user/entities/user.entity';
import { UserFixturesService } from '@app/console/fixtures/user/user-fixtures.service';
import { Role } from '@app/user/entities/role.entity';
import { Country } from '@app/product/entities/country.entity';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { FileFixturesService } from '@app/console/fixtures/file/file-fixtures.service';
import { Picture } from '@app/file/entities/picture.entity';
import { Stock } from '@app/product/entities/stock.entity';
import { CustomersFixturesService } from './customers/customers-fixtures.service';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { SharedModule } from '@app/shared/shared.module';
import { CustomerServiceModule } from '@app/customer/services/customer-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      User,
      Role,
      Country,
      TaxRule,
      TaxRuleGroup,
      Picture,
      Stock,
      Customer,
    ]),
    CustomerServiceModule,
    SharedModule,
  ],
  providers: [
    FixturesService,
    ProductFixturesService,
    UserFixturesService,
    FileFixturesService,
    CustomersFixturesService,
    ConsoleLogger,
  ],
})
export class FixturesModule {}
