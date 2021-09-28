import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from '@app/product/product.module';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { FileModule } from '@app/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ApplicationConfigurationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ProductModule,
    SharedModule,
    AuthModule,
    UserModule,
    FileModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(morgan(this.config.get<string>('MORGAN_FORMAT') ?? 'dev'))
      .forRoutes('*');
  }
}
