import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigurationService } from './customer-auth-configuration.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthConfigurationService,
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class CustomerAuthConfigurationModule {}
