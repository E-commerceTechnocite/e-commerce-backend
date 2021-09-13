import { Command, Console } from 'nestjs-console';
import { ProductFixturesService } from '@app/console/fixtures/product/product-fixtures.service';

@Console({
  command: 'fixtures',
  description: 'Database fixtures',
})
export class FixturesService {
  constructor(private readonly productFixtures: ProductFixturesService) {}

  @Command({
    command: 'load',
    description: 'Loads data fixtures',
  })
  async load() {
    await this.productFixtures.load();
  }

  @Command({
    command: 'clean',
    description: 'Cleans all tables',
  })
  async clean() {
    await this.productFixtures.clean();
  }
}
