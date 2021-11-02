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
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
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
  ApiSearchQueries,
} from '@app/shared/swagger';
import { UpdateProductDto } from '@app/product/dto/product/update-product.dto';

@ApiAdminAuth()
@ApiTags('Products')
@ApiUnauthorizedResponse()
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Granted(Permission.READ_PRODUCT)
  @ApiSearchQueries()
  @ApiOkPaginatedResponse(Product)
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse()
  @Get('search')
  async search(
    @Query('q') queryString: string,
    @Query('page') page = 1,
  ): Promise<PaginationDto<Product>> {
    return this.productService.search(queryString, page, 10);
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkPaginatedResponse(Product)
  @ApiPaginationQueries()
  @ApiNotFoundResponse()
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
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() product: ProductDto): Promise<any> {
    return await this.productService.create(product);
  }

  @Granted(Permission.UPDATE_PRODUCT)
  @ApiBody({ type: UpdateProductDto, required: false })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    return this.productService.update(id, product);
  }

  @Granted(Permission.DELETE_PRODUCT)
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.deleteFromId(id);
  }
}
