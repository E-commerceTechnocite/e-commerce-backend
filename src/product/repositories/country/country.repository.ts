import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { Country } from '@app/product/entities/country.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Country)
export class CountryRepository extends GenericRepository<Country> {}
