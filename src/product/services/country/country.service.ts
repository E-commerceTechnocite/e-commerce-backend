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
import { UpdateCountryDto } from '@app/product/dto/country/update-country.dto';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { SearchServiceInterface } from '@app/shared/interfaces/search-service.interface';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { CountryRepository } from '@app/product/repositories/country/country.repository';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';
import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Repository } from 'typeorm';
import { AddressCustomerRepository } from '@app/customer/adress/repositories/address.repository';

@Injectable()
export class CountryService
  implements
    CrudServiceInterface<Country, CountryDto, UpdateCountryDto>,
    PaginatorInterface<Country>,
    SearchServiceInterface<Country>
{
  constructor(
    @InjectRepository(CountryRepository)
    private readonly countryRepository: CountryRepository,
    @InjectRepository(TaxRuleRepository)
    private readonly taxRuleRepository: TaxRuleRepository,
    private readonly searchService: MysqlSearchEngineService,
    @InjectRepository(AddressCustomerRepository)
    private readonly addressCustomerRepository: AddressCustomerRepository,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Country>> {
    return await this.countryRepository.findAndPaginate(index, limit, {
      ...opts,
    });
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
    const country_relation = await this.addressCustomerRepository.findOne({
      where: { country: { id: id } },
    });

    if (country_relation) {
      throw new BadRequestException(
        'Country cannot be deleted because it is bound to at least one address',
      );
    } else {
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
