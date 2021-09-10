import { CrudServiceInterface } from '@app/interfaces/crud-service.interface';
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
  implements CrudServiceInterface<Country, CountryDto, CountryDto>
{
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async find(id: string | number): Promise<Country> {
    const country = await this.countryRepository.findOne(id);
    if (!country) {
      throw new NotFoundException();
    }
    return country;
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async create(entity: CountryDto): Promise<void> {
    const target: Country = {
      ...entity,
    };
    await this.countryRepository.save(target).catch(() => {
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
      throw new BadRequestException(`Category not found with id ${id}`);
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
