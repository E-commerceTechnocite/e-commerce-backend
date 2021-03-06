import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '@app/file/services/file.service';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Picture } from '@app/file/entities/picture.entity';
import { MimetypeEnum } from '@app/file/mimetype.enum';
import { Granted } from '@app/auth/admin/guard/decorators/granted.decorator';
import { Permission } from '@app/user/enums/permission.enum';
import {
  ApiAdminAuth,
  ApiFile,
  ApiFiles,
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PictureDto } from './dto/picture.dto';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';

@ApiExtraModels(Picture)
@ApiAdminAuth()
@ApiTags('File Upload')
@UseGuards(AdminJwtAuthGuard)
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

  @Granted(Permission.READ_FILE)
  @ApiOkPaginatedResponse(Picture)
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<Picture>> {
    return this.fileService.getPage(page, limit, { orderBy, order });
  }

  @Granted(Permission.UPDATE_FILE)
  @ApiBody({ type: PictureDto, required: false })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() picture: PictureDto,
    @Query('mimetype') mimetype: MimetypeEnum = MimetypeEnum.IMAGE,
  ): Promise<void> {
    await this.fileService.update(id, picture, mimetype);
  }

  @ApiQuery({ enum: MimetypeEnum, allowEmptyValue: true, name: 'mimetype' })
  @Granted(Permission.DELETE_FILE)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('mimetype')
    mimetype: MimetypeEnum = MimetypeEnum.IMAGE,
  ) {
    await this.fileService.delete(id, mimetype);
  }
}
