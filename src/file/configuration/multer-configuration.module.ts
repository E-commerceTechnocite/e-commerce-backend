import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterConfigurationService } from '@app/file/configuration/multer-configuration.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigurationService,
      inject: [ConfigService],
    }),
  ],
  exports: [MulterModule],
})
export class MulterConfigurationModule {}
