import { Module } from '@nestjs/common';
import { FixturesService } from '@app/console/fixtures/fixtures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductFixturesService } from '@app/console/fixtures/product/product-fixtures.service';
import { User } from '@app/user/user.entity';
import { UserFixturesService } from '@app/console/fixtures/user/user-fixtures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory, User])],
  providers: [FixturesService, ProductFixturesService, UserFixturesService],
})
export class FixturesModule {}
