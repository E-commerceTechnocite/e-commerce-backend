import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { MulterConfigurationModule } from '@app/file/configuration/multer-configuration.module';
import { PictureService } from './services/picture/picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture]), MulterConfigurationModule],
  providers: [FileService, PictureService],
  controllers: [FileController],
})
export class FileModule {}
