import { StripeOptions, StripeOptionsFactory } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentConfigurationService implements StripeOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createStripeOptions(): Promise<StripeOptions> | StripeOptions {
    console.log(this.config.get('STRIPE_KEY'));
    return {
      apiKey: this.config.get('STRIPE_KEY'),
      apiVersion: '2020-08-27',
    };
  }
}
