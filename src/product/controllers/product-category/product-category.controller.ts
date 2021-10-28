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
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { ProductCategory } from '@app/product/entities/product-category.entity';
import { ProductCategoryDto } from '@app/product/dto/product-category/product-category.dto';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { UpdateProductCategoryDto } from '@app/product/dto/product-category/update-product-category.dto';

@ApiAdminAuth()
@ApiTags('Product Categories')
@Controller({ path: 'product-category', version: '1' })
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Granted(Permission.READ_PRODUCT)
  @ApiSearchQueries()
  @ApiOkPaginatedResponse(ProductCategory)
  @HttpCode(HttpStatus.OK)
  @Get('search')
  async search(
    @Query('q') queryString: string,
    @Query('page') page = 1,
  ): Promise<PaginationDto<ProductCategory>> {
    return this.productCategoryService.search(queryString, page, 10);
  }

  @Granted(Permission.READ_CATEGORY)
  @ApiOkPaginatedResponse(ProductCategory)
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<ProductCategory>> {
    return this.productCategoryService.getPage(page, limit);
  }

  @Granted(Permission.READ_CATEGORY)
  @ApiOkResponse()
  @ApiResponse({ type: ProductCategory })
  @Get('all')
  async findAll(): Promise<any[]> {
    return this.productCategoryService.findAll();
  }

  @Granted(Permission.READ_CATEGORY)
  @ApiOkResponse()
  @ApiResponse({ type: ProductCategory })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.find(id);
  }

  @Granted(Permission.CREATE_CATEGORY)
  @ApiBody({ type: ProductCategoryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() category: ProductCategoryDto): Promise<any> {
    return await this.productCategoryService.create(category);
  }

  @Granted(Permission.UPDATE_CATEGORY)
  @ApiBody({ type: UpdateProductCategoryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() category: UpdateProductCategoryDto,
  ): Promise<any> {
    return this.productCategoryService.update(id, category);
  }

  @Granted(Permission.DELETE_CATEGORY)
  @ApiResponse({ type: null })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any[]> {
    return this.productCategoryService.deleteWithId(id);
  }
}
