import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './o-auth/auth.controller';
import { AuthService } from './o-auth/customer-auth.service';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CustomerModule } from '@app/customer/customer.module';
import { CustomerRefreshToken } from './entities/refresh-token.entity';
import { AuthConfigurationModule } from '@app/auth/admin/configuration/auth-configuration.module';
import { CustomerGuardModule } from '@app/auth/customer/guard/customer-guard.module';

@Module({
  imports: [
    AuthConfigurationModule,
    CustomerModule,
    PassportModule,
    TypeOrmModule.forFeature([Customer, CustomerRefreshToken]),
    CustomerGuardModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class CustomerAuthModule {}
