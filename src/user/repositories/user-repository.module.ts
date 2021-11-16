import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/user/entities/role.entity';
import { RoleRepository } from '@app/user/repositories/role/role.repository';
import { UserRepository } from '@app/user/repositories/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRepository, RoleRepository]),
  ],
  exports: [TypeOrmModule],
})
export class UserRepositoryModule {}
