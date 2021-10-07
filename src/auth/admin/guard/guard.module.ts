import { User } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from './auth-strategy.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class GuardModule {}
