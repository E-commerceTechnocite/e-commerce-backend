import { Command, Console } from 'nestjs-console';
import { ProductFixturesService } from '@app/console/fixtures/product/product-fixtures.service';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { UserFixturesService } from '@app/console/fixtures/user/user-fixtures.service';
import { FileFixturesService } from '@app/console/fixtures/file/file-fixtures.service';
import { CustomersFixturesService } from './customers/customers-fixtures.service';

@Console({
  command: 'fixtures',
  description: 'Database fixtures',
  alias: 'f',
})
export class FixturesService implements FixturesInterface {
  constructor(
    private readonly productFixtures: ProductFixturesService,
    private readonly userFixtures: UserFixturesService,
    private readonly fileFixtures: FileFixturesService,
    private readonly customersFixtures: CustomersFixturesService,
  ) {}

  @Command({
    command: 'load',
    description: 'Loads data fixtures',
    alias: 'l',
  })
  async load() {
    await this.productFixtures.load();
    await this.userFixtures.load();
    await this.fileFixtures.load();
    await this.customersFixtures.load();
  }

  @Command({
    command: 'clean',
    description: 'Cleans all tables',
    alias: 'c',
  })
  async clean() {
    await this.productFixtures.clean();
    await this.userFixtures.clean();
    await this.fileFixtures.clean();
    await this.customersFixtures.clean();
  }

  @Command({
    command: 'clean-load',
    description: 'Cleans current data and loads new data fixtures',
    alias: 'cl',
  })
  async cleanLoad() {
    await this.clean();
    await this.load();
  }
}
