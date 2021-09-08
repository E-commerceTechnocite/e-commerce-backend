import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigurationService } from '@app/configuration/type-orm/type-orm-configuration.service';
import { CacheConfigurationService } from '@app/configuration/cache/cache-configuration.service';

const getEnvFilePath = (): string => {
  const NODE_ENV: string = process.env['NODE_ENV'];
  return NODE_ENV && NODE_ENV.toLowerCase() === 'prod' ? '.env.prod' : '.env';
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: getEnvFilePath() }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigurationService,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: CacheConfigurationService,
      inject: [ConfigService],
    }),
  ],
  exports: [ConfigModule, TypeOrmModule, CacheModule],
})
export class ApplicationConfigurationModule {}
