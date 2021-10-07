import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from '@app/product/product.module';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AdminAuthModule } from './auth/admin/admin-auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from '@app/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CustomerModule } from './customer/customer.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
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
    AdminAuthModule,
    UserModule,
    FileModule,
    CustomerModule,
    ShoppingCartModule,
    MailModule,
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
