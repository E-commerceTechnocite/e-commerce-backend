import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { RoleDto } from '@app/user/dtos/role/role.dto';
import { Role } from '@app/user/entities/role.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService
  implements
    CrudServiceInterface<Role, RoleDto, RoleDto>,
    PaginatorInterface<Role>
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Role>> {
    const count = await this.roleRepo.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages) {
      throw new NotFoundException('This page of roles does not exist');
    }

    const query = this.roleRepo.createQueryBuilder('role');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }
    const data = await query
      .skip(index * limit - limit)
      .take(limit)
      .getMany();
    return {
      data,
      meta,
    };
  }

  async find(id: string | number): Promise<Role> {
    const role = await this.roleRepo.findOne(id);
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }
  findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async create(entity: RoleDto): Promise<Role> {
    const target: Role = {
      ...entity,
    };
    return await this.roleRepo.save(target).catch(() => {
      throw new BadRequestException();
    });
  }

  async update(id: string | number, entity: RoleDto): Promise<void> {
    const oldRole = await this.roleRepo.findOne(id);

    if (oldRole.name == 'Admin') {
      throw new BadRequestException('The << Admin >> Role cannot be changed !');
    }
    const target: Role = {
      name: entity.name,
      permissions: entity.permissions,
    };

    const result = await this.roleRepo.update(id, target);
    if (result.affected < 1) {
      throw new BadRequestException(`Role not found with id ${id}`);
    }
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
