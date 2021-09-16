import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';
import { UserDto } from './user.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class UserService
  implements CrudServiceInterface<User, UserDto, UserDto>
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async find(id: string | number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(entity: UserDto): Promise<User> {
    const role = await this.roleRepository.findOne(entity.roleId);

    if (!role) {
      throw new BadRequestException(`Role not found at id ${entity.roleId}`);
    }
    delete entity.roleId;

    const target: User = {
      ...entity,
      role,
    };
    return await this.roleRepository.save(target);
  }

  async update(id: string | number, entity: UserDto): Promise<void> {
    const role = await this.roleRepository.findOne(entity.roleId);

    if (!role) {
      throw new BadRequestException(`Role not found at id ${entity.roleId}`);
    }
    delete entity.roleId;

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(`User not found with id ${id}`);
    }
    const target: User = {
      ...user,
      ...entity,
      role,
    };
    await this.userRepository.update(id, target);
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
