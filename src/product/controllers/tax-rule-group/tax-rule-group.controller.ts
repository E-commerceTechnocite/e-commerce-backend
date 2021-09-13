import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { TaxRuleGroupDto } from '@app/product/dto/tax-rule-group/tax-rule-group.dto';
import { TaxRuleGroup } from '@app/product/entities/tax-rule-group.entity';
import { TaxRuleGroupService } from '@app/product/services/tax-rule-group/tax-rule-group.service';
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

@ApiTags('TaxRuleGroup')
@Controller({ path: 'tax-rule-group', version: '1' })
export class TaxRuleGroupController {
  constructor(private readonly taxRuleGroupService: TaxRuleGroupService) {}

  // @ApiOkResponse()
  // @ApiResponse({ type: TaxRuleGroup, isArray: true })
  // @Get()
  // async findAll(): Promise<TaxRuleGroup[]> {
  //   return this.taxRuleGroupService.findAll();
  // }

  @ApiOkResponse()
  @ApiResponse({ type: PaginationDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<TaxRuleGroup>> {
    return this.taxRuleGroupService.getPage(page, limit);
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