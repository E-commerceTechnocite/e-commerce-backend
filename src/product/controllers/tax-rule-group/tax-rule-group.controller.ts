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
  ApiBadRequestResponse,
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
  ErrorSchema,
} from '@app/shared/swagger';
import { UpdateTaxRuleGroupDto } from '@app/product/dto/tax-rule-group/update-tax-rule-group.dto';

@ApiAdminAuth()
@ApiTags('TaxRuleGroup')
@ApiUnauthorizedResponse({ type: ErrorSchema })
@Controller({ path: 'tax-rule-group', version: '1' })
export class TaxRuleGroupController {
  constructor(private readonly taxRuleGroupService: TaxRuleGroupService) {}

  @Granted(Permission.READ_TAX_RULE_GROUP)
  @ApiOkPaginatedResponse(TaxRuleGroup)
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<TaxRuleGroup>> {
    return this.taxRuleGroupService.getPage(page, limit, { order, orderBy });
  }

  @Granted(Permission.READ_TAX_RULE_GROUP)
  @ApiOkResponse({ type: TaxRuleGroup, isArray: true })
  @Get('all')
  async findAll(): Promise<any[]> {
    return this.taxRuleGroupService.findAll();
  }

  @Granted(Permission.READ_TAX_RULE_GROUP)
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiResponse({ type: TaxRuleGroup })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaxRuleGroup> {
    return this.taxRuleGroupService.find(id);
  }

  @Granted(Permission.CREATE_TAX_RULE_GROUP)
  @ApiBody({ type: TaxRuleGroupDto, required: false })
  @ApiCreatedResponse({ type: TaxRuleGroup })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() taxRuleGroup: TaxRuleGroupDto): Promise<any> {
    return await this.taxRuleGroupService.create(taxRuleGroup);
  }

  @Granted(Permission.UPDATE_TAX_RULE_GROUP)
  @ApiBody({ type: UpdateTaxRuleGroupDto, required: false })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() taxRuleGroup: UpdateTaxRuleGroupDto,
  ): Promise<any> {
    return this.taxRuleGroupService.update(id, taxRuleGroup);
  }

  @Granted(Permission.DELETE_TAX_RULE_GROUP)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any[]> {
    return await this.taxRuleGroupService.deleteWithId(id);
  }
}
