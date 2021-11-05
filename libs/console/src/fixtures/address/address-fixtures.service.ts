import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Country } from '@app/product/entities/country.entity';
import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FixturesInterface } from '../fixtures.interface';
import * as faker from 'faker';
import { AddressFixtureDto } from '@app/customer/adress/dto/address-fixture.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(AddressCustomer)
    private readonly addressRepository: Repository<AddressCustomer>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly logger: ConsoleLogger,
  ) {}

  async load() {
    const countries = await this.countryRepository.find();
    const customers = await this.customerRepository.find();

    const addresses = customers.map<AddressCustomer>((customer) => ({
      address: `${Math.floor(
        1 + Math.random() * 100,
      )} , Rue de la ville de : ${faker.address.cityName()}`,
      zipcode: `${Math.floor(1 + Math.random() * 9000)}`,
      region: faker.address.cityPrefix(),
      city: faker.address.cityName(),
      country: countries[Math.floor(Math.random() * countries.length)],
      customer: customer,
    }));

    await this.addressRepository.save(addresses);

    this.logger.log('loading customers addresses');
  }

  async clean() {
    await this.addressRepository.delete({});
  }
}
