import { Module } from '@nestjs/common';
import { PaymentConfigurationModule } from '@app/payment/configuration/payment-configuration.module';

@Module({
  imports: [PaymentConfigurationModule],
})
export class PaymentModule {}
