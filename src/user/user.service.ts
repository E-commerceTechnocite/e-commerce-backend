import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { UpdateUserDto } from './update-user.dto';
import { Role } from './entities/role.entity';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { MailService } from '@app/mail/mail.service';
import { hash } from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { RandomizerService } from '@app/shared/services/randomizer.service';

@Injectable()
export class UserService
  implements
    CrudServiceInterface<User, CreateUserDto, UpdateUserDto>,
    PaginatorInterface<User>
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly randomizerService: RandomizerService,
    private readonly mailService: MailService,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<User>> {
    const count = await this.userRepository.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages && meta.maxPages !== 0) {
      throw new NotFoundException('This page of products does not exist');
    }
    const query = this.userRepository.createQueryBuilder('u');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }

    let data = await query
      .leftJoinAndMapOne('u.role', Role, 'r', 'u.id_role = r.id')
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    data = data.map((item) => {
      delete item.password;
      return item;
    });
    return {
      data,
      meta,
    };
  }

  async find(id: string | number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(entity: CreateUserDto): Promise<User> {
    const role = await this.roleRepository.findOne(entity.roleId);
    console.log(role);
    if (!role) {
      throw new BadRequestException(`Role not found at id ${entity.roleId}`);
    }
    delete entity.roleId;
    const passwordGenerated = this.randomizerService.generatePassword(25);
    const target: User = {
      ...entity,
      password: await hash(passwordGenerated, 10),
      role,
    };
    console.log(target);
    await this.mailService.sendUserConfirmation(target, passwordGenerated);
    await this.userRepository.save(target);
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
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(`User not found with id ${id}`);
    }

    let newPassword = user.password;
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
