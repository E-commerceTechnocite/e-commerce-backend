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
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from '@app/user/enums/permission.enum';
import { Granted } from '@app/auth/admin/guard/granted.decorator';
import {
  ApiAdminAuth,
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { UpdateCountryDto } from '@app/product/dto/country/update-country.dto';

@ApiAdminAuth()
@ApiTags('Country')
@Controller({ path: 'country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Granted(Permission.READ_COUNTRY)
  @ApiQuery({ name: 'q', description: 'Query string' })
  @ApiQuery({ name: 'page', description: 'Page', required: false })
  @ApiOkPaginatedResponse(Country)
  @HttpCode(HttpStatus.OK)
  @Get('search')
  async search(
    @Query('q') queryString: string,
    @Query('page') page = 1,
  ): Promise<PaginationDto<Country>> {
    return this.countryService.search(queryString, page, 10);
  }

  @Granted(Permission.READ_COUNTRY)
  @ApiOkPaginatedResponse(Country)
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Country>> {
    return this.countryService.getPage(page, limit);
  }

  @Granted(Permission.READ_COUNTRY)
  @ApiOkResponse()
  @ApiResponse({ type: Country })
  @Get('all')
  async findAll(): Promise<any[]> {
    return await this.countryService.findAll();
  }

  @Granted(Permission.READ_COUNTRY)
  @ApiOkResponse()
  @ApiResponse({ type: Country })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Country> {
    return this.countryService.find(id);
  }

  @Granted(Permission.CREATE_COUNTRY)
  @ApiBody({ type: CountryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() country: CountryDto): Promise<any> {
    return await this.countryService.create(country);
  }

  @Granted(Permission.UPDATE_COUNTRY)
  @ApiBody({ type: UpdateCountryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() country: UpdateCountryDto,
  ): Promise<any> {
    return this.countryService.update(id, country);
  }

  @Granted(Permission.DELETE_COUNTRY)
  @ApiResponse({ type: null })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any[]> {
    return await this.countryService.deleteWithId(id);
  }
}
