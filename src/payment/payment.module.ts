import { Module } from '@nestjs/common';
import { StripeConfigurationModule } from '@app/payment/configuration/stripe-configuration.module';
import { PaymentService } from '@app/payment/services/payment.service';

@Module({
  imports: [StripeConfigurationModule],
  providers: [PaymentService],
})
export class PaymentModule {}
