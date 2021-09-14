import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '@app/file/file.service';
import { ApiTags } from '@nestjs/swagger';
import { PictureDto } from '@app/file/dto/picture.dto';

@ApiTags('File Upload')
@Controller({ path: 'file', version: '1' })
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload-bunch')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    this.fileService.add(...files);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: PictureDto,
  ) {
    console.log(data);
    this.fileService.add(file);
  }
}
