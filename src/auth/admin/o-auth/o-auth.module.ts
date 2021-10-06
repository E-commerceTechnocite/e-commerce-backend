import { User } from '@app/user/entities/user.entity';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigurationModule } from '../auth-configuration.module';
import { RefreshToken } from '../refresh-token.entity';
import { OAuthController } from './o-auth.controller';
import { OAuthService } from './o-auth.service';

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
