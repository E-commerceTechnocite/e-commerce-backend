import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.find(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() category: ProductCategoryDto): Promise<any> {
    return this.productCategoryService.create(category);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: ProductCategoryDto,
  ): Promise<any> {
    return this.productCategoryService.update(id, category);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.productCategoryService.deleteFromId(id);
  }
}