import { Injectable } from '@nestjs/common';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async clean() {
    await this.userRepo.delete({});
  }

  async load() {
    await this.userRepo.save({
      username: 'admin',
      email: 'admin@test.com',
      password: await hash('admin', 10),
    });
  }
}
