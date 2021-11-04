import { Module } from '@nestjs/common';

import { OAuthModule } from './o-auth/o-auth.module';
import { AdminGuardModule } from '@app/auth/admin/guard/admin-guard.module';

@Module({
  imports: [OAuthModule, AdminGuardModule],
})
export class AdminAuthModule {}
