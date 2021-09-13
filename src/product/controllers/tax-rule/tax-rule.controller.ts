import { TaxRuleDto } from '@app/product/dto/tax-rule/tax-rule.dto';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleService } from '@app/product/services/tax-rule/tax-rule.service';
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

@Controller('tax-rule')
export class TaxRuleController {
  constructor(private readonly taxRuleService: TaxRuleService) {}

  @ApiOkResponse()
  @ApiResponse({ type: TaxRule, isArray: true })
  @Get()
  async findAll(): Promise<TaxRule[]> {
    return this.taxRuleService.findAll();
  }

  @ApiOkResponse()
  @ApiResponse({ type: TaxRule })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaxRule> {
    return this.taxRuleService.find(id);
  }

  @ApiBody({ type: TaxRuleDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() taxRule: TaxRuleDto): Promise<any> {
    return this.taxRuleService.create(taxRule);
  }

  @ApiBody({ type: TaxRuleDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() taxRule: TaxRuleDto,
  ): Promise<any> {
    return this.taxRuleService.update(id, taxRule);
  }

  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.taxRuleService.deleteFromId(id);
  }
}
