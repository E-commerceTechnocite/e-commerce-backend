import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/user/entities/role.entity';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
