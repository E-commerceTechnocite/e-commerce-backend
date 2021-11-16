import { Module } from '@nestjs/common';
import { UserService } from '@app/user/services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { RoleController } from './controllers/role/role.controller';
import { RoleService } from './services/role/role.service';
import { SharedModule } from '@app/shared/shared.module';
import { UserRepositoryModule } from '@app/user/repositories/user-repository.module';

@Module({
  imports: [SharedModule, UserRepositoryModule],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController],
})
export class UserModule {}
