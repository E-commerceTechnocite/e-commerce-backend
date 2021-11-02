import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { TaxRuleDto } from '@app/product/dto/tax-rule/tax-rule.dto';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { TaxRuleService } from '@app/product/services/tax-rule/tax-rule.service';
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
import { Granted } from '@app/auth/admin/guard/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';
import { TaxRuleUpdateDto } from '@app/product/dto/tax-rule/tax-rule-update.dto';
import { ApiAdminAuth, ApiOkPaginatedResponse } from '@app/shared/swagger';

@ApiAdminAuth()
@ApiTags('TaxRule')
@Controller({ path: 'tax-rule', version: '1' })
export class TaxRuleController {
  constructor(private readonly taxRuleService: TaxRuleService) {}

  @Granted(Permission.READ_TAX_RULE)
  @ApiOkPaginatedResponse(TaxRule)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<TaxRule>> {
    return this.taxRuleService.getPage(page, limit);
  }

  @Granted(Permission.READ_TAX_RULE)
  @ApiOkResponse()
  @ApiResponse({ type: TaxRule })
  @Get('all')
  async findAll(): Promise<any[]> {
    return this.taxRuleService.findAll();
  }

  @Granted(Permission.READ_TAX_RULE)
  @ApiOkResponse()
  @ApiResponse({ type: TaxRule })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaxRule> {
    return this.taxRuleService.find(id);
  }

  @Granted(Permission.CREATE_TAX_RULE)
  @ApiBody({ type: TaxRuleDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() taxRule: TaxRuleDto): Promise<any> {
    return await this.taxRuleService.create(taxRule);
  }

  @Granted(Permission.UPDATE_TAX_RULE)
  @ApiBody({ type: TaxRuleUpdateDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() taxRule: TaxRuleUpdateDto,
  ): Promise<any> {
    return this.taxRuleService.update(id, taxRule);
  }

  @Granted(Permission.DELETE_TAX_RULE)
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.taxRuleService.deleteFromId(id);
  }
}
