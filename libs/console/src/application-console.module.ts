import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { FixturesModule } from '@app/console/fixtures/fixtures.module';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';
import { DatabaseModule } from '@app/console/database/database.module';

@Module({
  imports: [
    ApplicationConfigurationModule,
    ConsoleModule,
    FixturesModule,
    DatabaseModule,
  ],
})
export class ApplicationConsoleModule {}
