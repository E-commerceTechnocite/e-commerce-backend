import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from '@app/product/product.service';
import { Product } from '@app/product/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() product: Product): Promise<any> {
    return this.productService.create(product);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<any> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.productService.deleteFromId(id);
  }
}
