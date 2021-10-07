import { User } from '@app/user/entities/user.entity';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigurationModule } from '@app/auth/admin/configuration/auth-configuration.module';
import { RefreshToken } from '@app/auth/admin/entities/refresh-token.entity';
import { OAuthController } from '@app/auth/admin/o-auth/o-auth.controller';
import { OAuthService } from '@app/auth/admin/o-auth/o-auth.service';

@Module({
  imports: [
    AuthConfigurationModule,
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}
