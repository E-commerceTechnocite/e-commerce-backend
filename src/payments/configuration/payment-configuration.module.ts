import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { PaymentConfigurationService } from '@app/payments/configuration/payment.configuration.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StripeModule.forRootAsync({
      useClass: PaymentConfigurationService,
      inject: [ConfigService],
    }),
  ],
})
export class PaymentConfigurationModule {}
