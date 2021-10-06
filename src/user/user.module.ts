import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/user/entities/role.entity';
import { UserController } from './controllers/user/user.controller';
import { RoleController } from './controllers/role/role.controller';
import { RoleService } from './services/role/role.service';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController],
})
export class UserModule {}
