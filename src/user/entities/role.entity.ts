import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from '@app/user/enums/permission.enum';
import { User } from '@app/user/entities/user.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class Role extends EntitySchema {
  @Column()
  name?: string;

  @Column({ type: 'set', enum: Permission })
  permissions?: Permission[];

  @OneToMany(() => User, (user) => user.role, { lazy: true })
  users?: User[];
}
