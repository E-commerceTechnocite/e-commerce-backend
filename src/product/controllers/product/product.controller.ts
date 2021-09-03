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
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse()
  @ApiResponse({ type: Product })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @ApiOkResponse()
  @ApiResponse({ type: Product, isArray: true })
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiCreatedResponse()
  @ApiBody({ type: Product, required: false })
  @ApiResponse({ type: Product })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() product: Product): Promise<any> {
    return this.productService.create(product);
  }

  @ApiBody({ type: Product, required: false })
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
