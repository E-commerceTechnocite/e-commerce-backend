import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StaticFilesConfigurationService } from '@app/configuration/static-files/static-files-configuration.service';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useClass: StaticFilesConfigurationService,
      inject: [ConfigService],
    }),
  ],
})
export class StaticFilesConfigurationModule {}
