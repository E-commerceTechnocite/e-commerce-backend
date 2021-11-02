import { Module } from '@nestjs/common';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { GetCheckDeleteEntityIdService } from './services/get-check-delete-entity-id.service';
import { RandomizerService } from './services/randomizer.service';
import { MysqlSearchEngineService } from '@app/shared/services/mysql-search-engine.service';

@Module({
  providers: [
    IsPositiveIntPipe,
    GetCheckDeleteEntityIdService,
    RandomizerService,
    MysqlSearchEngineService,
  ],
  exports: [
    IsPositiveIntPipe,
    GetCheckDeleteEntityIdService,
    RandomizerService,
    MysqlSearchEngineService,
  ],
})
export class SharedModule {}
