import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { PictureRepository } from '@app/file/repositories/picture/picture.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Picture, PictureRepository])],
  exports: [TypeOrmModule],
})
export class FileRepositoryModule {}
