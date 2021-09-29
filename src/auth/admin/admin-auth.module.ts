import { Module } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigurationService } from '@app/auth/admin/auth-configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { RefreshToken } from '@app/auth/admin/refresh-token.entity';
import { AuthStrategy } from '@app/auth/admin/auth-strategy.service';
import { OAuthService } from '@app/auth/admin/o-auth/o-auth.service';
import { OAuthController } from '@app/auth/admin/o-auth/o-auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthConfigurationService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  providers: [AuthStrategy, OAuthService],
  controllers: [OAuthController],
  exports: [PassportModule, JwtModule, AuthStrategy],
})
export class AdminAuthModule {}
