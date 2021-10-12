import { Module } from '@nestjs/common';
import { PaymentConfigurationModule } from '@app/payments/configuration/payment-configuration.module';

@Module({
  imports: [PaymentConfigurationModule],
})
export class PaymentModule {}
