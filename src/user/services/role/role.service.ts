import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { RoleDto } from '@app/user/dtos/role/role.dto';
import { UpdateRoleDto } from '@app/user/dtos/role/update-role.dto';
import { Role } from '@app/user/entities/role.entity';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '@app/user/repositories/role/role.repository';
import { User } from '@app/user/entities/user.entity';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class RoleService
  implements
    CrudServiceInterface<Role, RoleDto, UpdateRoleDto>,
    PaginatorInterface<Role>
{
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepo: RoleRepository,
    @Inject(REQUEST)
    private readonly request: Request & Express.Request,
  ) {}

  private checkAuthenticatedUserPermissions(
    role: RoleDto,
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
  ): Promise<PaginationDto<Role>> {
    return this.roleRepo.findAndPaginate(index, limit, { ...opts });
  }

  async find(id: string | number): Promise<Role> {
    let role;
    try {
      role = await this.roleRepo.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`Role does not found at id : ${id}`);
    }
    return role;
  }

  findAll(): Promise<any[]> {
    return this.roleRepo
      .createQueryBuilder('role')
      .select(['role.id', 'role.name'])
      .getMany();
  }

  async create(entity: RoleDto): Promise<Role> {
    // // TODO dé-commenter quand les guards seront fix
    // this.checkAuthenticatedUserPermissions(entity);
    const target: Role = {
      ...entity,
    };
    return await this.roleRepo.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(id: string | number, entity: UpdateRoleDto): Promise<void> {
    // // TODO dé-commenter quand les guards seront fix
    // this.checkAuthenticatedUserPermissions(entity);
    let role: Role;
    try {
      role = await this.roleRepo.findOneOrFail({ where: { id: id } });
    } catch {
      throw new NotFoundException(`Role does not exist at id : ${id}`);
    }
    // // TODO dé-commenter quand les guards seront fix
    // this.checkAuthenticatedUserPermissions(role);

    const target: Role = {
      ...role,
      name: entity.name,
      permissions: entity.permissions,
    };

    await this.roleRepo.save(target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.roleRepo.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException('Role not found or already deleted');
    }
  }

  async delete(entity: Role): Promise<void> {
    const result = await this.roleRepo.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException('Role not found or already deleted');
    }
    throw new Error('Method not implemented.');
  }
}
