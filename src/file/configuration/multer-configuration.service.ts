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
      storage: multer.diskStorage({
        filename: function (
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const type = file.mimetype.split('/')[1];
          callback(
            null,
            file.originalname.split('.')[0] + '-' + Date.now() + '.' + type,
          );
        },
        destination: join(__dirname, '..', '..', '..', 'public', 'files'),
      }),
    };
  }
}
