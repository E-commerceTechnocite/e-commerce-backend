import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { mock, mockFn } from 'jest-mock-extended';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Country } from '@app/product/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

describe('CountryService', () => {
  let service: CountryService;
  const countryRepository = mock<Repository<Country>>();
  const taxRuleRepository = mock<Repository<TaxRule>>();
  const searchEngineService = mock<MysqlSearchEngineService>();

  const countryStub = (): Country => ({
    id: Math.round(Math.random() * 1000000) + '',
    name: 'Belgium',
    code: 'BE',
    taxRules: undefined,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: getRepositoryToken(Country), useValue: countryRepository },
        { provide: getRepositoryToken(TaxRule), useValue: taxRuleRepository },
        { provide: MysqlSearchEngineService, useValue: searchEngineService },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of objects', async () => {
      const returnResponse = [countryStub(), countryStub()].map((c) => ({
        id: c.id,
        name: c.name,
      }));

      const qb = mock<SelectQueryBuilder<Country>>({
        select: mockFn().calledWith().mockReturnThis(),
        getMany(): Promise<any[]> {
          return Promise.resolve(returnResponse);
        },
      });

      countryRepository.createQueryBuilder
        .calledWith('country')
        .mockReturnValueOnce(qb);

      // expect(qb.select).toHaveBeenCalledWith(['country.id', 'country.name']);
      expect(await service.findAll()).toEqual(returnResponse);
    });
  });

  describe('findOne', () => {
    it('should return a country', async () => {
      const country = countryStub();

      const fn = mockFn<
        (options?: FindOneOptions<Country>) => Promise<Country>
      >()
        .calledWith({ where: { id: country.name } })
        .mockResolvedValueOnce(country)();

      countryRepository.findOneOrFail.mockResolvedValueOnce(fn);

      expect(await service.find(country.id)).toEqual(country);
    });
  });
});
