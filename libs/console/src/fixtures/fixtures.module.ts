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
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { ShoppingCart } from '@app/shopping-cart/entities/shopping-cart.entity';
import { CartItemsFixturesService } from './cart-items/cart-items-fixtures.service';
import { AddressFixturesService } from './address/address-fixtures.service';
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Order } from '@app/order/entities/order.entity';
import { OrdersFixturesService } from './order/orders-fixtures.service';
import { OrderProductFixturesService } from './order-product/order-product-fixtures.service';
import { OrderProduct } from '@app/order/entities/order-product.entity';

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
      CartItem,
      ShoppingCart,
      AddressCustomer,
      Order,
      OrderProduct,
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
    CartItemsFixturesService,
    AddressFixturesService,
    OrdersFixturesService,
    OrderProductFixturesService,
  ],
})
export class FixturesModule {}
