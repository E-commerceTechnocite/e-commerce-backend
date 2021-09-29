import { Module } from '@nestjs/common';
import { AdminAuthModule } from '@app/auth/admin/admin-auth.module';

@Module({
  imports: [AdminAuthModule],
})
export class AuthModule {}
