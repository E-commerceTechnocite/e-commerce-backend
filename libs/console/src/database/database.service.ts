import { Command, Console } from 'nestjs-console';
import { Connection, QueryRunner } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from '@nestjs/common';

@Console({
  command: 'database',
  alias: 'd',
  description: 'Database related commands',
})
export class DatabaseService {
  private query: QueryRunner;

  constructor(
    private readonly connection: Connection,
    private readonly config: ConfigService,
    private readonly logger: ConsoleLogger,
  ) {
    this.query = this.connection.createQueryRunner();
  }

  @Command({ command: 'drop', alias: 'd' })
  async drop() {
    await this.query.dropDatabase(this.config.get('DATABASE_NAME'), true);
    this.logger.log('Database deleted');
  }

  @Command({ command: 'create', alias: 'c' })
  async create() {
    await this.query.createDatabase(this.config.get('DATABASE_NAME'), true);
    this.logger.log('Database created');
  }

  @Command({ command: 'drop-create', alias: 'dc' })
  async dropAndCreate() {
    await this.drop();
    await this.create();
  }
}
