import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { UpdateUserDto } from '../../update-user.dto';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { MailService } from '@app/mail/mail.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../../create-user.dto';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { UserRepository } from '@app/user/repositories/user/user.repository';
import { REQUEST } from '@nestjs/core';
import { Role } from '@app/user/entities/role.entity';
import { RoleService } from '@app/user/services/role/role.service';

@Injectable()
export class UserService
  implements
    CrudServiceInterface<User, CreateUserDto, UpdateUserDto>,
    PaginatorInterface<User>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly randomizerService: RandomizerService,
    private readonly mailService: MailService,
    @Inject(REQUEST)
    private readonly request: Request & Express.Request,
  ) {}

  private checkSuperAdmin(user: User) {
    if (user.role?.superAdmin === false) return;
    throw new ForbiddenException('User is a superadmin or role is not set');
  }

  private checkAuthenticatedUserPermissions(
    role: Role,
    message = 'Current user is missing required permissions',
  ): void {
    const admin = this.request.user as User;
    const permitted = role.permissions.every((permission) => {
      return admin.role.permissions.includes(permission);
    });
    if (!permitted) {
      throw new ForbiddenException(message);
    }
  }

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<User>> {
    return this.userRepository.findAndPaginate(index, limit, { ...opts });
  }

  async find(id: string | number): Promise<User> {
    let user;
    try {
      user = await this.userRepository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`User does not exist at id : ${id}`);
    }
    return user;
  }

  findAll(): Promise<any[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username'])
      .getMany();
  }

  async create(entity: CreateUserDto): Promise<User> {
    const username = entity.username;
    const email = entity.email;

    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username ', { username })
      .orWhere('user.email = :email', { email })
      .getCount();

    if ((await qb) > 0) {
      throw new BadRequestException('Username or Email already used');
    }

    const role = await this.roleService.find(entity.roleId);

    if (role.superAdmin) {
      throw new ForbiddenException(`Cannot assign a superadmin role`);
    }

    this.checkAuthenticatedUserPermissions(role);

    delete entity.roleId;
    const passwordGenerated = this.randomizerService.randomString(25);
    const target: User = {
      ...entity,
      password: await hash(passwordGenerated, 10),
      role,
    };

    await this.mailService.sendUserConfirmation(target, passwordGenerated);
    await this.userRepository.save(target);
    delete target.password;
    return target;
  }

  async update(id: string | number, entity: UpdateUserDto): Promise<void> {
    let role;
    if (entity.roleId != undefined) {
      role = await this.roleService.find(entity.roleId);

      if (role.superAdmin) {
        throw new ForbiddenException(`Cannot assign a superadmin role`);
      }
    }

    delete entity.roleId;
    const user = await this.find(id);
    this.checkSuperAdmin(user);

    this.checkAuthenticatedUserPermissions(user.role);
    if (role) {
      this.checkAuthenticatedUserPermissions(role);
    }

    let newPassword = null;
    if (entity.regenPass) {
      newPassword = this.randomizerService.randomString(25);
    }

    const target: User = {
      ...user,
      ...entity,
      password: entity.regenPass ? await hash(newPassword, 10) : user.password,
      role,
    };
    await this.userRepository.save(target);
    delete target.password;
    await this.mailService.sendUserConfirmation(target, newPassword);
  }

  async deleteFromId(id: string | number): Promise<void> {
    this.checkSuperAdmin(await this.find(id));
    const result = await this.userRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`User not found or already deleted`);
    }
  }

  async delete(entity: User): Promise<void> {
    this.checkSuperAdmin(entity);
    const result = await this.userRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`User not found or already deleted`);
    }
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne(username);
  }
}
