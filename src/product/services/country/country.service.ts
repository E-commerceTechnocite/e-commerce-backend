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
import { UpdateCountryDto } from '@app/product/dto/country/update-country.dto';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { SearchServiceInterface } from '@app/shared/interfaces/search-service.interface';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

@Injectable()
export class CountryService
  implements
    CrudServiceInterface<Country, CountryDto, UpdateCountryDto>,
    PaginatorInterface<Country>,
    SearchServiceInterface<Country>
{
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(TaxRule)
    private readonly taxRuleRepository: Repository<TaxRule>,
    private readonly searchService: MysqlSearchEngineService,
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
    let country;
    try {
      country = await this.countryRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`Country does not exist at id : ${id}`);
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

  async update(id: string | number, entity: UpdateCountryDto): Promise<void> {
    let country;
    try {
      country = await this.countryRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`Country does not exist at id : ${id}`);
    }

    const target: Country = {
      ...country,
      ...entity,
    };

    await this.countryRepository.save(target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.countryRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException('Country not found or already deleted');
    }
  }

  async deleteWithId(id: string | number): Promise<any[]> {
    let target;
    try {
      target = await this.countryRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new BadRequestException(
        `Country not found or already deleted at id : ${id}`,
      );
    }
    const taxRules = {
      entityType: 'TaxRule',
      taxRules: await this.taxRuleRepository
        .createQueryBuilder('tax_rule')
        .where('tax_rule.countryId=:id', { id: id })
        .getMany(),
    };

    await this.countryRepository.delete(id);

    return [taxRules];
  }

  async delete(entity: Country): Promise<void> {
    const result = await this.countryRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException('Country not found or already deleted');
    }
  }

  async search(
    query: string,
    index: number,
    limit: number,
  ): Promise<PaginationDto<Country>> {
    try {
      const sqlQuery = await this.searchService.createSearchQuery(
        this.countryRepository.createQueryBuilder('p'),
        query,
        [{ name: 'name' }, { name: 'code' }],
      );

      console.log(sqlQuery.getQueryAndParameters());

      const count = await sqlQuery.getCount();

      const meta = new PaginationMetadataDto(index, limit, count);
      const data = await sqlQuery
        .skip(index * limit - limit)
        .take(limit)
        .getMany();

      return { data, meta };
    } catch (err) {
      if (err instanceof RuntimeException) {
        throw new BadRequestException(err.message);
      }
      console.log(err.message);
      throw err;
    }
  }
}
