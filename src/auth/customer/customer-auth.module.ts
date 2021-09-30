import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigurationService } from '@app/auth/admin/auth-configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { RefreshToken } from '@app/auth/admin/refresh-token.entity';
//import { AuthStrategy } from '@app/auth/admin/auth-strategy.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CustomerModule } from '@app/customer/customer.module';
import { AuthStrategy } from './auth-strategy.services';

@Module({
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthConfigurationService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [AuthStrategy, AuthService],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule, AuthStrategy],
})
export class CustomerAuthModule {}
