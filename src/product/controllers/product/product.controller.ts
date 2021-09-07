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
import { ProductDto } from '@app/product/dto/product/product.dto';

@ApiTags('Products')
@Controller({ path: 'product', version: '1' })
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
  @ApiBody({ type: ProductDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() product: ProductDto): Promise<void> {
    return this.productService.create(product);
  }

  @ApiBody({ type: ProductDto, required: false })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<void> {
    return this.productService.update(id, product);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.deleteFromId(id);
  }
}
