import { ConsoleLogger, Injectable } from '@nestjs/common';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { Repository } from 'typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(Picture)
    private readonly picturesRepo: Repository<Picture>,
    private readonly logger: ConsoleLogger,
  ) {}

  async clean() {
    await this.picturesRepo.delete({});
    fs.rm(
      path.join(__dirname, '..', '..', '..', '..', '..', 'public', 'files'),
      { recursive: true, force: true },
      () => {
        this.logger.log('Files deleted');
      },
    );
  }

  async load() {
    const pictures: Picture[] = [];
    for (let i = 0; i < 150; i++) {
      pictures.push({
        title: faker.random.words(3),
        uri: faker.image.imageUrl(),
        caption: faker.random.words(10),
      });
    }
    await this.picturesRepo.save(pictures);
    this.logger.log('Pictures added');
  }
}
