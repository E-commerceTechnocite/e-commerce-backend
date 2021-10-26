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
  Query,
} from '@nestjs/common';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from '@app/product/dto/product/product.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { Granted } from '@app/auth/admin/guard/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';
import {
  ApiAdminAuth,
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { UpdateProductDto } from '@app/product/dto/product/update-product.dto';

@ApiAdminAuth()
@ApiTags('Products')
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Granted(Permission.READ_PRODUCT)
  @ApiQuery({ name: 'q', description: 'Query string' })
  @ApiQuery({ name: 'page', description: 'Page', required: false })
  @ApiOkPaginatedResponse(Product)
  @HttpCode(HttpStatus.OK)
  @Get('search')
  async search(
    @Query('q') queryString: string,
    @Query('page') page = 1,
  ): Promise<PaginationDto<Product>> {
    return this.productService.search(queryString, page, 10);
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkResponse({ type: Product })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkPaginatedResponse(Product)
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<Product>> {
    return this.productService.getPage(page, limit, { orderBy, order });
  }

  @Granted(Permission.CREATE_PRODUCT)
  @ApiCreatedResponse()
  @ApiBody({ type: ProductDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() product: ProductDto): Promise<any> {
    return await this.productService.create(product);
  }

  @Granted(Permission.UPDATE_PRODUCT)
  @ApiBody({ type: UpdateProductDto, required: false })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    return this.productService.update(id, product);
  }

  @Granted(Permission.DELETE_PRODUCT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.deleteFromId(id);
  }
}
