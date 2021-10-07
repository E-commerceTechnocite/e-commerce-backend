import { User } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from '@app/auth/admin/guard/auth-strategy.service';
import { JwtAuthGuard } from '@app/auth/admin/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AdminGuardModule {}
