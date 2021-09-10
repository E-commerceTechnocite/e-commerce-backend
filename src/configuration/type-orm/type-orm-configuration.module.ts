import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigurationService } from '@app/configuration/type-orm/type-orm-configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigurationService,
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmConfigurationModule {}
