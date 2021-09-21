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
import { ApiBearerAuth, ApiConsumes, ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Picture } from '@app/file/entities/picture.entity';
import { MimetypeEnum } from '@app/file/mimetype.enum';
import { Granted } from '@app/auth/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';
import { ApiFile, ApiFiles, ApiOkPaginatedResponse } from '@app/shared/swagger/decorators';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';

@ApiExtraModels(Picture)
@ApiBearerAuth()
@ApiTags('File Upload')
@Controller({ path: 'file', version: '1' })
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Granted(Permission.CREATE_FILE)
  @ApiConsumes('multipart/form-data')
  @ApiFiles('files')
  @Post('upload-bunch')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    await this.fileService.add(...files);
  }

  @Granted(Permission.CREATE_FILE)
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.fileService.add(file);
  }

  // @Granted(Permission.READ_FILE)
  // @Get()
  // findAll(@Query('mimetype')
  // mimetype: MimetypeEnum = MimetypeEnum.IMAGE,): Promise<Picture[]> {
  //   return this.fileService.findAll(mimetype);
  // }

  @Granted(Permission.READ_FILE)
  @ApiOkPaginatedResponse(Picture)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Picture>> {
    return this.fileService.getPage(page, limit);
  }

  @ApiQuery({ enum: MimetypeEnum, allowEmptyValue: true, name: 'mimetype' })
  @Granted(Permission.DELETE_FILE)
  @Delete(':title')
  async delete(
    @Param('title') title: string,
    @Query('mimetype')
    mimetype: MimetypeEnum = MimetypeEnum.IMAGE,
  ) {
    await this.fileService.delete(title, mimetype);
  }
}
