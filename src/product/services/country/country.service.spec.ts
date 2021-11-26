import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { mock, mockFn } from 'jest-mock-extended';
import { DeleteResult, SelectQueryBuilder } from 'typeorm';
import { Country } from '@app/product/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { country } from '@app/test/stub';
import { TaxRuleRepository } from '@app/product/repositories/tax-rule/tax-rule.repository';
import { CountryRepository } from '@app/product/repositories/country/country.repository';
import { AddressCustomerRepository } from '@app/customer/adress/repositories/address.repository';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { createCountryDto } from '@app/test/stub/dto/country/create-country-dto';
import { id } from '@app/test/util/id';
import { updateCountryDto } from '@app/test/stub/dto/country/update-country-dto';

describe('CountryService', () => {
  let service: CountryService;
  const countryRepository = mock<CountryRepository>();
  const taxRuleRepository = mock<TaxRuleRepository>();
  const searchEngineService = mock<MysqlSearchEngineService>();
  const addressCustomerRepository = mock<AddressCustomerRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(CountryRepository),
          useValue: countryRepository,
        },
        {
          provide: getRepositoryToken(TaxRuleRepository),
          useValue: taxRuleRepository,
        },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
        {
          provide: getRepositoryToken(AddressCustomerRepository),
          useValue: addressCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    countryRepository.save.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of objects', async () => {
      // GIVEN
      const countries = [country(), country()];

      const returnResponse = countries.map((c) => ({
        id: c.id,
        name: c.name,
      }));

      const qb = mock<SelectQueryBuilder<Country>>({
        select: mockFn().mockReturnThis(),
        getMany: mockFn().mockResolvedValueOnce(returnResponse),
      });

      countryRepository.createQueryBuilder.mockReturnValueOnce(qb);

      // WHEN
      const response = await service.findAll();

      // THEN
      expect(response).toEqual(returnResponse);
      expect(countryRepository.createQueryBuilder).toHaveBeenCalledWith(
        'country',
      );
      expect(qb.select).toHaveBeenCalledWith(['country.id', 'country.name']);
      expect(qb.select.mock.calls.length).toEqual(1);
      expect(qb.getMany).toHaveBeenCalled();
      expect(qb.getMany.mock.calls.length).toEqual(1);
    });
  });

  describe('findOne', () => {
    it('should return a country', async () => {
      const c = country();
      countryRepository.findOneOrFail.mockResolvedValueOnce(c);

      const response = await service.find(c.id);

      expect(response).toEqual(c);
      expect(countryRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: c.id },
      });
    });
  });

  describe('getPage', () => {
    it('should return a pagination', async () => {
      const countries = [country(), country()];
      const page = 1;
      const limit = 10;
      const count = countries.length;
      const pagination: PaginationDto<Country> = {
        data: countries,
        meta: new PaginationMetadataDto(page, limit, count),
      };
      countryRepository.findAndPaginate.mockResolvedValueOnce(pagination);

      const response = await service.getPage(page, limit);

      expect(response).toEqual(pagination);
      expect(countryRepository.findAndPaginate).toHaveBeenCalledWith(
        page,
        limit,
        {},
      );
    });
  });

  describe('create', () => {
    it('should create a country', async () => {
      const c = createCountryDto();
      const entity: Country = { ...c };
      const savedEntity: Country = { id: id(), ...entity };
      countryRepository.save.mockResolvedValueOnce(savedEntity);

      const response = await service.create(c);

      expect(response).toEqual(savedEntity);
      expect(countryRepository.save).toHaveBeenCalledWith(entity);
      expect(countryRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a country', async () => {
      const c = updateCountryDto();
      const entity = country();
      const savedEntity: Country = { ...entity, ...c };
      countryRepository.findOneOrFail.mockResolvedValueOnce(entity);
      countryRepository.save.mockResolvedValueOnce(savedEntity);

      const response = await service.update(entity.id, c);

      expect(response).toBeUndefined();
      expect(countryRepository.save).toHaveBeenCalledWith(savedEntity);
      expect(countryRepository.save).toHaveBeenCalledTimes(1);
    });
  });
  describe('delete a country', () => {
    it('should delete a country', async () => {
      const id = '1234';
      const result: DeleteResult = { affected: 1, raw: {} };
      countryRepository.delete.mockResolvedValueOnce(result);

      const response = await service.deleteFromId(id);

      expect(response).toBeUndefined();
      expect(countryRepository.delete).toHaveBeenCalledWith(id);
      expect(countryRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
