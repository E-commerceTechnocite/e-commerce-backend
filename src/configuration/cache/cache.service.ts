import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string, setter: CallableFunction): Promise<T> {
    let item: T = await this.cache.get(key);
    if (item) return item;
    item = await setter();
    await this.cache.set(key, item);
    return item;
  }

  async delete(key: string): Promise<any> {
    return await this.cache.del(key);
  }

  async reset(): Promise<void> {
    return await this.cache.reset();
  }
}
