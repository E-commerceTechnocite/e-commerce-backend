import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from '@app/user/enums/permission.enum';
import { User } from '@app/user/entities/user.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role extends EntitySchema {
  @ApiProperty()
  @Column()
  name?: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: () => false })
  superAdmin?: boolean = false;

  @ApiProperty()
  @Column({ type: 'set', enum: Permission })
  permissions?: Permission[];

  @OneToMany(() => User, (user) => user.role, { lazy: true })
  users?: User[];
}
