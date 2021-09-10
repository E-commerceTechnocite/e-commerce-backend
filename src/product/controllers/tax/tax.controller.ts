import { TaxDto } from '@app/product/dto/tax/tax.dto';
import { Tax } from '@app/product/entities/tax.entity';
import { TaxService } from '@app/product/services/tax/tax.service';
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
import { ApiBody, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'tax', version: '1' })
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @ApiOkResponse()
  @ApiResponse({ type: Tax, isArray: true })
  @Get()
  async findAll(): Promise<Tax[]> {
    return this.taxService.findAll();
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
