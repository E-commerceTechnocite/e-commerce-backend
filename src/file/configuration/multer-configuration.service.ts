import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as multer from 'multer';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { MimetypeEnum, MimetypeEnumUtil } from '@app/file/mimetype.enum';
import { mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class MulterConfigurationService implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const { storageFileName, fileFilter, storageDestination } =
      MulterConfigurationService;
    return {
      storage: multer.diskStorage({
        filename: storageFileName,
        destination: storageDestination,
      }),
      fileFilter: fileFilter,
      limits: { fileSize: 1024 * 1024 },
    };
  }

  private static storageDestination(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ): void {
    const dir = join(__dirname, '..', '..', '..', 'public', 'files');
    mkdirSync(dir, { recursive: true });
    return callback(null, dir);
  }

  private static storageFileName(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void {
    const extension = path.extname(file.originalname);
    const fileName = path.basename(file.originalname).replace(extension, '');
    callback(null, `${fileName}-${Date.now()}${extension}`);
  }

  private static fileFilter(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    const [mimetype, mimetypeExtension] = file.mimetype.split('/');
    const extension = path.extname(file.originalname);
    if (!MimetypeEnumUtil.matchMimetype(file)) {
      return callback(
        new BadRequestException(
          `Mimetype not supported: ${mimetype} (${file.originalname})`,
        ),
        false,
      );
    }
    const allowedImageTypes = [
      '.png',
      '.jpeg',
      '.jpg',
      '.gif',
      '.webp',
      '.jpe',
    ];
    if (
      mimetype === MimetypeEnum.IMAGE &&
      !allowedImageTypes.includes(extension.toLowerCase())
    ) {
      return callback(
        new BadRequestException(
          `Image extension not allowed, provide one of [${allowedImageTypes.join(
            ', ',
          )}]`,
        ),
        false,
      );
    }
    callback(null, true);
  }
}
