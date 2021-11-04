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
  UseGuards,
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
  ErrorSchema,
} from '@app/shared/swagger';
import { UpdateProductDto } from '@app/product/dto/product/update-product.dto';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';

@ApiAdminAuth()
@ApiTags('Products')
@UseGuards(AdminJwtAuthGuard)
@ApiUnauthorizedResponse({ type: ErrorSchema })
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Granted(Permission.READ_PRODUCT)
  @ApiSearchQueries()
  @ApiOkPaginatedResponse(Product)
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({ type: ErrorSchema })
  @Get('search')
  async search(
    @Query('q') queryString: string,
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Product>> {
    return this.productService.search(queryString, page, limit);
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkResponse({ type: Product, isArray: true })
  @Get('all')
  async findAll(): Promise<any[]> {
    return this.productService.findAll();
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse({ type: ErrorSchema })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @Granted(Permission.READ_PRODUCT)
  @ApiOkPaginatedResponse(Product)
  @ApiPaginationQueries()
  @ApiNotFoundResponse({ type: ErrorSchema })
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
  @ApiCreatedResponse({ type: Product })
  @ApiBody({ type: ProductDto, required: false })
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Post()
  async create(@Body() product: ProductDto): Promise<any> {
    return await this.productService.create(product);
  }

  @Granted(Permission.UPDATE_PRODUCT)
  @ApiBody({ type: UpdateProductDto, required: false })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({ type: ErrorSchema })
  @ApiNotFoundResponse({ type: ErrorSchema })
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
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.deleteFromId(id);
  }
}
