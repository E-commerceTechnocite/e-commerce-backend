import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { Role } from '@app/user/entities/role.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Role)
export class RoleRepository extends GenericRepository<Role> {}
