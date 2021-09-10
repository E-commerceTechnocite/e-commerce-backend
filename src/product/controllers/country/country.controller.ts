import { CountryDto } from '@app/product/dto/country/country.dto';
import { Country } from '@app/product/entities/country.entity';
import { CountryService } from '@app/product/services/country/country.service';
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

@Controller({ path: 'country', version: '1' })
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOkResponse()
  @ApiResponse({ type: Country, isArray: true })
  @Get()
  async findAll(): Promise<Country[]> {
    return this.countryService.findAll();
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
