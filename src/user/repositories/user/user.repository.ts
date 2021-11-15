import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { User } from '@app/user/entities/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends GenericRepository<User> {}
