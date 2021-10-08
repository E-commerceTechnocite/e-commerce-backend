import { Module } from '@nestjs/common';

import { OAuthModule } from './o-auth/o-auth.module';

@Module({
  imports: [OAuthModule],
})
export class AdminAuthModule {}
