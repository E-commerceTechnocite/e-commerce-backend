import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Injectable, PipeTransform } from '@nestjs/common';
import { Country } from '@app/product/entities/country.entity';

export class CountryDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Length(2, 10)
  @IsString()
  code?: string;
}

@Injectable()
export class ParseCountryDto implements PipeTransform {
  async transform(value: CountryDto): Promise<Country> {
    return {
      ...value,
    };
  }
}
