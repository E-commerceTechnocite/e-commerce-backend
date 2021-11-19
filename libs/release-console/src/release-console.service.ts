import { Command, Console } from 'nestjs-console';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/user/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionUtil } from '@app/user/enums/permission.enum';
import { hash } from 'bcrypt';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { ConsoleLogger } from '@nestjs/common';
import { MailService } from '@app/mail/mail.service';

@Console()
export class ReleaseConsoleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    private readonly randomizer: RandomizerService,
    private readonly logger: ConsoleLogger,
    private readonly mailService: MailService,
  ) {}

  @Command({
    command: 'create-super-admin-and-roles',
    options: [{ flags: '-e, --email <email-address>' }],
  })
  async createSuperAdminAndRoles({ email }) {
    const superAdminRole: Role = {
      name: 'superadmin',
      superAdmin: true,
      permissions: PermissionUtil.allPermissions(),
    };

    let role = await this.roleRepo.findOne({ where: { name: 'superadmin' } });

    if (!role) {
      role = await this.roleRepo.save(superAdminRole);
    } else {
      const existingAdmin = await this.userRepo.findOne({
        where: { role: role },
      });
      if (existingAdmin) {
        this.logger.error(`A superadmin account already exists`);
        process.exit(1);
      }
    }

    const password = this.randomizer.generatePassword(14);
    const superAdmin: User = {
      email: email,
      username: 'superadmin',
      role: role,
      password: await hash(password, 10),
    };

    const user = await this.userRepo.save(superAdmin);
    await this.mailService.sendAdminCreation(user, password);
    this.logger.log(`Superadmin account successfully created`);
    this.logger.log(`Check your inbox for credentials`);
  }
}
