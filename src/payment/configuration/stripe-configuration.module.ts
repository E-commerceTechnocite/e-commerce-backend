import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { StripeConfigurationService } from '@app/payment/configuration/stripe-configuration.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StripeModule.forRootAsync({
      useClass: StripeConfigurationService,
      inject: [ConfigService],
    }),
  ],
})
export class StripeConfigurationModule {}
