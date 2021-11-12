import { Injectable } from '@nestjs/common';
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static';
import { join } from 'path';

@Injectable()
export class StaticFilesConfigurationService
  implements ServeStaticModuleOptionsFactory
{
  createLoggerOptions():
    | Promise<ServeStaticModuleOptions[]>
    | ServeStaticModuleOptions[] {
    const dir = (...directory: string[]) =>
      join(__dirname, '..', '..', '..', ...directory);

    return [
      {
        rootPath: dir('public'),
        serveRoot: '/public',
      },
      {
        rootPath: dir('admin'),
        serveRoot: '/admin',
      },
    ];
  }
}
