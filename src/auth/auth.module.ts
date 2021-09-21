import { Module } from '@nestjs/common';
import { OAuthController } from './o-auth/o-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigurationService } from '@app/auth/auth-configuration.service';
import { UserModule } from '@app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from '@app/auth/auth-strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { OAuthService } from '@app/auth/o-auth/o-auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthConfigurationService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ AuthStrategy, OAuthService],
  controllers: [OAuthController],
  exports: [PassportModule, JwtModule, AuthStrategy],
})
export class AuthModule {}
