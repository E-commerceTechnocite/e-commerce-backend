import { Product } from '@app/product/entities/product.entity';
import { ProductService } from '@app/product/services/product/product.service';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { ApiOkPaginatedResponse } from '@app/shared/swagger/decorators';
import { ApiCustomerAuth } from '@app/shared/swagger/decorators/auth/api-customer-auth.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products (Customer)')
@ApiCustomerAuth()
@Controller({ path: 'customer/product', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @ApiOkPaginatedResponse(Product)
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<Product>> {
    return this.productService.getPage(page, limit, { orderBy, order });
  }

  // find product by title
  // todo
  @ApiOkResponse({ type: Product })
  @Get('/search/:name')
  async findByTitle(@Param('name') name: string): Promise<Product> {
    return this.productService.findByTitle(name);
  }
}
