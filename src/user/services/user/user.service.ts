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
import { RoleRepository } from '@app/user/repositories/role/role.repository';
import { REQUEST } from '@nestjs/core';
import { Role } from '@app/user/entities/role.entity';

@Injectable()
export class UserService
  implements
    CrudServiceInterface<User, CreateUserDto, UpdateUserDto>,
    PaginatorInterface<User>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    private readonly randomizerService: RandomizerService,
    private readonly mailService: MailService,
    @Inject(REQUEST)
    private readonly request: Request & Express.Request,
  ) {}

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
    delete user.password;
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

    let role: Role;
    try {
      role = await this.roleRepository.findOneOrFail({
        where: { id: entity.roleId },
      });
    } catch {
      throw new NotFoundException(
        `Role does not exist at id : ${entity.roleId}`,
      );
    }
    // // TODO dé-commenter quand les guards seront fix
    // this.checkAuthenticatedUserPermissions(role);

    delete entity.roleId;
    const passwordGenerated = this.randomizerService.generatePassword(25);
    const target: User = {
      ...entity,
      password: await hash(passwordGenerated, 10),
      role,
    };

    console.log(target);
    // await this.mailService.sendUserConfirmation(target, passwordGenerated);
    // await this.userRepository.save(target);
    delete target.password;
    return target;
  }

  async update(id: string | number, entity: UpdateUserDto): Promise<void> {
    console.log(entity);
    let role;
    if (entity.roleId != undefined) {
      role = await this.roleRepository
        .findOneOrFail(entity.roleId)
        .catch(() => {
          throw new BadRequestException(
            `Role not found at id ${entity.roleId}`,
          );
        });
    }

    console.log(role);
    delete entity.roleId;
    let user;
    try {
      user = await this.userRepository.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`User does not exist with id : ${id}`);
    }

    // // TODO dé-commenter quand les guards seront fix
    // this.checkAuthenticatedUserPermissions(user.role);
    // if (role) {
    //   this.checkAuthenticatedUserPermissions(role);
    // }

    let newPassword = null;
    if (entity.regenPass) {
      newPassword = this.randomizerService.generatePassword(25);
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
    const result = await this.userRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`User not found or already deleted`);
    }
  }

  async delete(entity: User): Promise<void> {
    const result = await this.userRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`User not found or already deleted`);
    }
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne(username);
  }
}
