import { Module } from '@nestjs/common';
import { ProductController } from '@app/product/controllers/product/product.controller';
import { ProductService } from '@app/product/services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductCategoryController } from '@app/product/controllers/product-category/product-category.controller';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Product]), SharedModule],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductService, ProductCategoryService],
  exports: [ProductService, ProductCategoryService],
})
export class ProductModule {}
