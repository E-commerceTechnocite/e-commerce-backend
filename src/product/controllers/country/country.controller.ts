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

@ApiTags('Country')
@Controller({ path: 'country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // @ApiOkResponse()
  // @ApiResponse({ type: Country, isArray: true })
  // @Get()
  // async findAll(): Promise<Country[]> {
  //   return this.countryService.findAll();
  // }

  @Granted()
  @ApiOkResponse()
  @ApiResponse({ type: PaginationDto })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Country>> {
    return this.countryService.getPage(page, limit);
  }

  @ApiOkResponse()
  @ApiResponse({ type: Country })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Country> {
    return this.countryService.find(id);
  }

  @ApiBody({ type: CountryDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() country: CountryDto): Promise<any> {
    return this.countryService.create(country);
  }

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

  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.countryService.deleteFromId(id);
  }
}
