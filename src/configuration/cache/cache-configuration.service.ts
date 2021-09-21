import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CacheConfigurationService implements CacheOptionsFactory {
  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    return {};
  }
}
