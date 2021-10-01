import { Module } from '@nestjs/common';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';

@Module({
  providers: [IsPositiveIntPipe],
  exports: [IsPositiveIntPipe],
})
export class SharedModule {}
