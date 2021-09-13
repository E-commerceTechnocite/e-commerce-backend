import { PaginationDto } from '@app/dto/pagination/pagination.dto';
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
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tax')
@Controller({ path: 'tax', version: '1' })
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  // @ApiOkResponse()
  // @ApiResponse({ type: Tax, isArray: true })
  // @Get()
  // async findAll(): Promise<Tax[]> {
  //   return this.taxService.findAll();
  // }

  @ApiOkResponse()
  @ApiResponse({ type: PaginationDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Tax>> {
    return this.taxService.getPage(page, limit);
  }

  @ApiOkResponse()
  @ApiResponse({ type: Tax })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tax> {
    return this.taxService.find(id);
  }

  @ApiBody({ type: TaxDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() tax: TaxDto): Promise<any> {
    return this.taxService.create(tax);
  }

  @ApiBody({ type: TaxDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() tax: TaxDto): Promise<any> {
    return this.taxService.update(id, tax);
  }

  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.taxService.deleteFromId(id);
  }
}
