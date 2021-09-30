import { Module } from '@nestjs/common';
import { AuthService } from '../customer/services/auth/auth.service';

@Module({
  providers: [AuthService],
})
export class CustomerAuthModule {}
