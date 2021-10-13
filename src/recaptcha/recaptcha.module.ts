import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RecaptchaService } from './services/recaptcha/recaptcha.service';

@Module({
  imports: [HttpModule],
  providers: [RecaptchaService],
})
export class RecaptchaModule {}
