import { ConsoleLogger, Injectable } from '@nestjs/common';
import { FixturesInterface } from '@app/console/fixtures/fixtures.interface';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Role } from '@app/user/entities/role.entity';
import { Permission, PermissionUtil } from '@app/user/enums/permission.enum';

@Injectable()
export class UserFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly logger: ConsoleLogger,
  ) {}

  async load() {
    const adminPassword = 'admin';
    const userPassword = 'user';
    const admin: User = {
      username: 'admin',
      email: 'admin@test.com',
      password: await hash(adminPassword, 10),
    };
    const user: User = {
      username: 'user',
      email: 'user@test.com',
      password: await hash(userPassword, 10),
    };

    const roles: Role[] = [
      { name: 'Admin', permissions: PermissionUtil.allPermissions() },
      {
        name: 'User',
        permissions: [
          Permission.READ_PRODUCT,
          Permission.CREATE_PRODUCT,
          Permission.UPDATE_PRODUCT,
          Permission.READ_CATEGORY,
          Permission.CREATE_CATEGORY,
          Permission.UPDATE_CATEGORY,
        ],
      },
    ];
    await this.roleRepo.save(roles);

    admin.role = await this.roleRepo.findOne({ where: { name: 'Admin' } });
    user.role = await this.roleRepo.findOne({ where: { name: 'User' } });

    await this.userRepo.save([admin, user]);
    this.logger.log('Roles and users added');
    this.logger.log(
      JSON.stringify({ username: admin.username, password: adminPassword }),
    );
    this.logger.log(
      JSON.stringify({ username: user.username, password: userPassword }),
    );
  }

  async clean() {
    await this.userRepo.delete({});
    await this.roleRepo.delete({});
    this.logger.log('Roles and users deleted');
  }
}
