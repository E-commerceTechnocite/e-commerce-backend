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
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product Categories')
@Controller({ path: 'product-category', version: '1' })
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @ApiOkResponse()
  @ApiResponse({ type: ProductCategory, isArray: true })
  @Get()
  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll();
  }

  @ApiOkResponse()
  @ApiResponse({ type: ProductCategory })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.find(id);
  }

  @ApiBody({ type: ProductCategoryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() category: ProductCategoryDto): Promise<any> {
    return this.productCategoryService.create(category);
  }

  @ApiBody({ type: ProductCategoryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() category: ProductCategoryDto,
  ): Promise<any> {
    return this.productCategoryService.update(id, category);
  }

  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.productCategoryService.deleteFromId(id);
  }
}
