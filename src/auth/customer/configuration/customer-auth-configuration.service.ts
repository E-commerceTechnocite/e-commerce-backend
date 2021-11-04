import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigurationService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.config.get<string>('CUSTOMER_JWT_SECRET'),
      signOptions: {
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN'),
      },
    };
  }
}
