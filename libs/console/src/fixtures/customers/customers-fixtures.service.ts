import { Customer } from '@app/customer/entities/customer/customer.entity';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FixturesInterface } from '../fixtures.interface';
import * as faker from 'faker';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { hash } from 'bcrypt';
import { Gender } from '@app/customer/entities/customer/customer.enum';
import { CustomerService } from '@app/customer/services/customer/customer.service';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';

@Injectable()
export class CustomersFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly randomizerService: RandomizerService,
    private readonly logger: ConsoleLogger,
    private readonly customerService: CustomerService,
  ) {}

  async load() {
    for (let i = 0; i < 20; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const target: CustomerDto = {
        username: faker.name.firstName() + `${Math.floor(Math.random() * 55)}`,
        password: await hash(this.randomizerService.generatePassword(10), 10),
        firstName: firstName,
        lastName: lastName,
        email: `${firstName}.${lastName}@customers.com`,
        phoneNumber: faker.phone.phoneNumber(),
        gender: i % 2 == 0 ? Gender.masculin : Gender.feminin,
        birthDate: faker.date.past(),
        newsletter: i % 2 == 0 ? true : false,
      };
      await this.customerService.createCustomer(target);
    }

    const customerTest: CustomerDto = {
      username: 'bob10',
      password: 'bob123',
      firstName: 'bob',
      lastName: 'bob',
      email: `bob@bob.com`,
      phoneNumber: faker.phone.phoneNumber(),
      gender: Gender.masculin,
      birthDate: faker.date.past(),
      newsletter: false,
    };
    await this.customerService.createCustomer(customerTest);
    this.logger.log('Customers added');
  }
  async clean() {
    await this.customerRepository.delete({});
  }
}
