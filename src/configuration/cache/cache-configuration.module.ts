import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheConfigurationService } from '@app/configuration/cache/cache-configuration.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: CacheConfigurationService,
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigurationModule {}
