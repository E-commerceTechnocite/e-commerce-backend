import { TaxRuleGroupDto } from '@app/product/dto/tax-rule-group/tax-rule-group.dto';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { TaxRuleGroupService } from '@app/product/services/tax-rule-group/tax-rule-group.service';
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

@Controller({ path: 'tax-rule-group', version: '1' })
export class TaxRuleGroupController {
  constructor(private readonly taxRuleGroupService: TaxRuleGroupService) {}

  @ApiOkResponse()
  @ApiResponse({ type: TaxRuleGroup, isArray: true })
  @Get()
  async findAll(): Promise<TaxRuleGroup[]> {
    return this.taxRuleGroupService.findAll();
  }

  @ApiOkResponse()
  @ApiResponse({ type: TaxRuleGroup })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaxRuleGroup> {
    return this.taxRuleGroupService.find(id);
  }

  @ApiBody({ type: TaxRuleGroupDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() taxRuleGroup: TaxRuleGroupDto): Promise<any> {
    return this.taxRuleGroupService.create(taxRuleGroup);
  }

  @ApiBody({ type: TaxRuleGroupDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() taxRuleGroup: TaxRuleGroupDto,
  ): Promise<any> {
    return this.taxRuleGroupService.update(id, taxRuleGroup);
  }

  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.taxRuleGroupService.deleteFromId(id);
  }
}
