import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as multer from 'multer';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { MimetypeEnumUtil } from '@app/file/mimetype.enum';

@Injectable()
export class MulterConfigurationService implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const { storageFileName, fileFilter } = MulterConfigurationService;
    return {
      storage: multer.diskStorage({
        filename: storageFileName,
        destination: join(__dirname, '..', '..', '..', 'public', 'files'),
      }),
      fileFilter: fileFilter,
    };
  }

  private static storageFileName(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void {
    const type = file.mimetype.split('/')[1];
    callback(
      null,
      file.originalname.split('.')[0] + '-' + Date.now() + '.' + type,
    );
  }

  private static fileFilter(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    if (!MimetypeEnumUtil.matchMimetype(file)) {
      return callback(new BadRequestException('Mimetype not supported'), false);
    }
    callback(null, true);
  }
}
