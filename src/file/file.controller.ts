import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '@app/file/services/file.service';
import { ApiTags } from '@nestjs/swagger';
import { Picture } from '@app/file/entities/picture.entity';
import { MimetypeEnum } from '@app/file/mimetype.enum';

@ApiTags('File Upload')
@Controller({ path: 'file', version: '1' })
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload-bunch')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    await this.fileService.add(...files);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.fileService.add(file);
  }

  @Get()
  findAll(): Promise<Picture[]> {
    return this.fileService.findAll();
  }

  @Delete(':title')
  async delete(
    @Param('title') title: string,
    @Query('mimetype')
    mimetype: MimetypeEnum = MimetypeEnum.IMAGE,
  ) {
    await this.fileService.delete(title, mimetype);
  }
}
