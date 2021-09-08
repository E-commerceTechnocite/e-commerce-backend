import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from '@app/product/product.module';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ApplicationConfigurationModule, ProductModule],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(morgan(this.config.get<string>('MORGAN_FORMAT') ?? 'dev'))
      .forRoutes('*');
  }
}
