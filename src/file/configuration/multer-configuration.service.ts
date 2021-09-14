import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as multer from 'multer';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

@Injectable()
export class MulterConfigurationService implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      dest: join(__dirname, '..', '..', '..', 'public'),
      storage: multer.diskStorage({
        filename(
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const type = file.mimetype.split('/')[1];
          callback(
            null,
            file.originalname.split('.')[0] + Date.now() + '.' + type,
          );
        },
      }),
    };
  }
}
