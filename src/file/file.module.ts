import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './file.controller';
import { MulterConfigurationModule } from '@app/file/configuration/multer-configuration.module';
import { PictureService } from './services/picture/picture.service';
import { FileRepositoryModule } from '@app/file/repositories/file-repository.module';

@Module({
  imports: [FileRepositoryModule, MulterConfigurationModule],
  providers: [FileService, PictureService],
  controllers: [FileController],
})
export class FileModule {}
