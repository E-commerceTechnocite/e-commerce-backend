import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CountryDto } from '@app/product/dto/country/country.dto';
import { Country } from '@app/product/entities/country.entity';
import { CountryService } from '@app/product/services/country/country.service';
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
  UseGuards,
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
import { Permission } from '@app/user/enums/permission.enum';
import { Granted } from '@app/auth/admin/guard/granted.decorator';
import {
  ApiAdminAuth,
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
  ApiSearchQueries,
  ErrorSchema,
} from '@app/shared/swagger';
import { UpdateCountryDto } from '@app/product/dto/country/update-country.dto';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/jwt-auth.guard';

@ApiAdminAuth()
@ApiTags('Country')
@ApiUnauthorizedResponse({ type: ErrorSchema })
@UseGuards(AdminJwtAuthGuard)
@Controller({ path: 'country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Granted(Permission.READ_COUNTRY)
  @ApiSearchQueries()
  @ApiOkPaginatedResponse(Country)
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.OK)
  @Get('search')
  async search(
    @Query('q') queryString: string,
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Country>> {
    return this.countryService.search(queryString, page, limit);
  }

  @Granted(Permission.READ_COUNTRY)
  @ApiOkPaginatedResponse(Country)
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<Country>> {
    return this.countryService.getPage(page, limit, {
      orderBy,
      order,
    });
  }

  @Granted(Permission.READ_COUNTRY)
  @ApiOkResponse({ type: Country, isArray: true })
  @Get('all')
  async findAll(): Promise<any[]> {
    return await this.countryService.findAll();
  }

  @Granted(Permission.READ_COUNTRY)
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiResponse({ type: Country })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Country> {
    return this.countryService.find(id);
  }

  @Granted(Permission.CREATE_COUNTRY)
  @ApiBody({ type: CountryDto, required: false })
  @ApiCreatedResponse({ type: Country })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() country: CountryDto): Promise<any> {
    return await this.countryService.create(country);
  }

  @Granted(Permission.UPDATE_COUNTRY)
  @ApiBody({ type: UpdateCountryDto, required: false })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() country: UpdateCountryDto,
  ): Promise<any> {
    return this.countryService.update(id, country);
  }

  @Granted(Permission.DELETE_COUNTRY)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any[]> {
    return await this.countryService.deleteWithId(id);
  }
}
