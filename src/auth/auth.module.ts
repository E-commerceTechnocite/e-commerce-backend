import { Module } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { OAuthController } from './o-auth/o-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigurationService } from '@app/auth/auth-configuration.service';
import { UserModule } from '@app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from '@app/auth/auth-strategy.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthConfigurationService,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthStrategy],
  controllers: [OAuthController],
})
export class AuthModule {}
