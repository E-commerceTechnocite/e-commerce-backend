import { Module } from '@nestjs/common';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { GetCheckDeleteEntityIdService } from './services/get-check-delete-entity-id.service';
import { RandomizerService } from './services/randomizer.service';

@Module({
  providers: [
    IsPositiveIntPipe,
    GetCheckDeleteEntityIdService,
    RandomizerService,
  ],
  exports: [
    IsPositiveIntPipe,
    GetCheckDeleteEntityIdService,
    RandomizerService,
  ],
})
export class SharedModule {}
