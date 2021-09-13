import { Command, Console } from 'nestjs-console';
import { ProductFixturesService } from '@app/console/fixtures/product/product-fixtures.service';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { UserFixturesService } from '@app/console/fixtures/user/user-fixtures.service';

@Console({
  command: 'fixtures',
  description: 'Database fixtures',
  alias: 'f',
})
export class FixturesService implements FixturesInterface {
  constructor(
    private readonly productFixtures: ProductFixturesService,
    private readonly userFixtures: UserFixturesService,
  ) {}

  @Command({
    command: 'load',
    description: 'Loads data fixtures',
    alias: 'l',
  })
  async load() {
    await this.productFixtures.load();
    await this.userFixtures.load();
  }

  @Command({
    command: 'clean',
    description: 'Cleans all tables',
    alias: 'c',
  })
  async clean() {
    await this.productFixtures.clean();
    await this.userFixtures.clean();
  }
}
