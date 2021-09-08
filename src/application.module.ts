import { Module } from '@nestjs/common';
import { ProductModule } from '@app/product/product.module';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';

@Module({
  imports: [ApplicationConfigurationModule, ProductModule],
})
export class ApplicationModule {}
