import { Module } from '@nestjs/common';
import { ProductController } from '@app/product/controllers/product.controller';
import { ProductService } from '@app/product/services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@app/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
