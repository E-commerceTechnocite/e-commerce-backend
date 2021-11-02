import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { TaxDto } from '@app/product/dto/tax/tax.dto';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxService } from '@app/product/services/tax/tax.service';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Granted } from '@app/auth/admin/guard/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';
import {
  ApiAdminAuth,
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { UpdateTaxDto } from '@app/product/dto/tax/update-tax.dto';

@ApiAdminAuth()
@ApiTags('Tax')
@ApiUnauthorizedResponse()
@Controller({ path: 'tax', version: '1' })
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Granted(Permission.READ_TAX)
  @ApiOkPaginatedResponse(Tax)
  @ApiNotFoundResponse()
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Tax>> {
    return this.taxService.getPage(page, limit);
  }

  @Granted(Permission.READ_TAX)
  @ApiOkResponse()
  @ApiResponse({ type: Tax })
  @Get('all')
  async findAll(): Promise<any[]> {
    return this.taxService.findAll();
  }

  @Granted(Permission.READ_TAX)
  @ApiOkResponse({ type: Tax })
  @ApiNotFoundResponse()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tax> {
    return this.taxService.find(id);
  }

  @Granted(Permission.CREATE_TAX)
  @ApiBody({ type: TaxDto, required: false })
  @ApiCreatedResponse({ type: Tax })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() tax: TaxDto): Promise<Tax> {
    return await this.taxService.create(tax);
  }

  @Granted(Permission.UPDATE_TAX)
  @ApiBody({ type: UpdateTaxDto, required: false })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() tax: UpdateTaxDto,
  ): Promise<any> {
    return this.taxService.update(id, tax);
  }

  @Granted(Permission.DELETE_TAX)
  @ApiNoContentResponse()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any[]> {
    return this.taxService.deleteWithId(id);
  }
}
