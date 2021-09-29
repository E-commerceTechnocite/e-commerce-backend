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
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from '@app/user/enums/permission.enum';
import { Granted } from '@app/auth/admin/granted.decorator';
import { ApiOkPaginatedResponse } from '@app/shared/swagger/decorators';

@ApiBearerAuth()
@ApiTags('Country')
@Controller({ path: 'country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Granted(Permission.READ_COUNTRY)
  @ApiOkPaginatedResponse(Country)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
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
  @ApiBody({ type: CountryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() country: CountryDto,
  ): Promise<any> {
    return this.countryService.update(id, country);
  }

  @Granted(Permission.DELETE_COUNTRY)
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.countryService.deleteFromId(id);
  }
}
