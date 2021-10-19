import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { CountryDto } from '@app/product/dto/country/country.dto';
import { Country } from '@app/product/entities/country.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService
  implements
    CrudServiceInterface<Country, CountryDto, CountryDto>,
    PaginatorInterface<Country>
{
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Country>> {
    const count = await this.countryRepository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of countries does not exist');
    }

    const query = this.countryRepository.createQueryBuilder('country');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }
    const data = await query
      .skip(index * limit - limit)
      .take(limit)
      .getMany();
    return {
      data,
      meta,
    };
  }

  async find(id: string | number): Promise<Country> {
    const country = await this.countryRepository.findOne({ where: { id: id } });
    if (!country) {
      throw new NotFoundException();
    }
    return country;
  }

  findAll(): Promise<any[]> {
    return this.countryRepository
      .createQueryBuilder('country')
      .select(['country.id', 'country.name'])
      .getMany();
  }

  async create(entity: CountryDto): Promise<Country> {
    const target: Country = {
      ...entity,
    };
    return await this.countryRepository.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(id: string | number, entity: CountryDto): Promise<void> {
    const target: Country = {
      name: entity.name,
      code: entity.code,
    };

    const result = await this.countryRepository.update(id, target);
    if (result.affected < 1) {
      throw new BadRequestException(`Country not found with id ${id}`);
    }
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.countryRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException('Country not found or already deleted');
    }
  }

  async delete(entity: Country): Promise<void> {
    const result = await this.countryRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException('Country not found or already deleted');
    }
  }
}
