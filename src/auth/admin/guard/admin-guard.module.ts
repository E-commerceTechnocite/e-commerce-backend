import { User } from '@app/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from '@app/auth/admin/guard/auth-strategy.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthStrategy],
})
export class AdminGuardModule {}
