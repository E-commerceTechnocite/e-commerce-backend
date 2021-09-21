import { ConsoleLogger, Injectable } from '@nestjs/common';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { Repository } from 'typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
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

  load() {
    this.logger.log('');
  }
}
