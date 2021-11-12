import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigurationModule } from '@app/configuration/type-orm/type-orm-configuration.module';
import { CacheConfigurationModule } from '@app/configuration/cache/cache-configuration.module';
import { StaticFilesConfigurationModule } from '@app/configuration/static-files/static-files-configuration.module';

const getEnvFilePath = (): string => {
  const NODE_ENV: string = process.env['NODE_ENV'];
  return NODE_ENV && NODE_ENV.toLowerCase() === 'prod' ? '.env.prod' : '.env';
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvFilePath() }),
    TypeOrmConfigurationModule,
    CacheConfigurationModule,
    StaticFilesConfigurationModule,
  ],
  exports: [
    ConfigModule,
    TypeOrmConfigurationModule,
    CacheConfigurationModule,
    StaticFilesConfigurationModule,
  ],
})
export class ApplicationConfigurationModule {}
