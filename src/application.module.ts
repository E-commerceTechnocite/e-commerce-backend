import { Module } from '@nestjs/common';
import { ApplicationConfigModule } from '@app/application-config.module';

@Module({
  imports: [ApplicationConfigModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
