import { Customer } from '@app/customer/entities/customer/customer.entity';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FixturesInterface } from '../fixtures.interface';
import * as faker from 'faker';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { hash } from 'bcrypt';
import { Gender } from '@app/customer/entities/customer/customer.enum';

@Injectable()
export class CustomersFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly randomizerService: RandomizerService,
    private readonly logger: ConsoleLogger,
  ) {}

  async load() {
    for (let i = 0; i < 20; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const target: Customer = {
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
      await this.customerRepository.save(target);
    }
    this.logger.log('Customers added');
  }
  async clean() {
    await this.customerRepository.delete({});
  }
}
