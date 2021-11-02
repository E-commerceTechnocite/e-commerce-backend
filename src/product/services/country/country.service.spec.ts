import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { mock, mockFn } from 'jest-mock-extended';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Country } from '@app/product/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxRule } from '@app/product/entities/tax-rule.entity';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';
import { country } from '@app/test/stub';

describe('CountryService', () => {
  let service: CountryService;
  const countryRepository = mock<Repository<Country>>();
  const taxRuleRepository = mock<Repository<TaxRule>>();
  const searchEngineService = mock<MysqlSearchEngineService>();

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
});
