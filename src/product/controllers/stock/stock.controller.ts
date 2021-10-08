import { Granted } from '@app/auth/admin/guard/granted.decorator';
import { CreateStockDto } from '@app/product/dto/stock/stock-create.dto';
import { UpdateStockDto } from '@app/product/dto/stock/stock-update.dto';
import { Stock } from '@app/product/entities/stock.entity';
import { StockService } from '@app/product/services/stock/stock.service';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { ApiAdminAuth, ApiOkPaginatedResponse } from '@app/shared/swagger';
import { Permission } from '@app/user/enums/permission.enum';
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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiAdminAuth()
@ApiTags('Stock')
@Controller({ path: 'stock', version: '1' })
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Granted(Permission.READ_STOCK)
  @ApiOkResponse({ type: Stock })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Stock> {
    return this.stockService.find(id);
  }

  @Granted(Permission.READ_STOCK)
  @ApiOkPaginatedResponse(Stock)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
  ): Promise<PaginationDto<Stock>> {
    return this.stockService.getPage(page, limit, { orderBy });
  }

  @Granted(Permission.CREATE_STOCK)
  @ApiCreatedResponse()
  @ApiBody({ type: CreateStockDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() stock: CreateStockDto): Promise<any> {
    return await this.stockService.create(stock);
  }

  @Granted(Permission.UPDATE_STOCK)
  @ApiBody({ type: UpdateStockDto, required: false })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() stock: UpdateStockDto,
  ): Promise<void> {
    return this.stockService.update(id, stock);
  }

  @Granted(Permission.DELETE_STOCK)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.stockService.deleteFromId(id);
  }
}
