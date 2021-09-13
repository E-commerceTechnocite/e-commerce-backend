import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '@app/user/enums/permission.enum';
import { User } from '@app/user/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ type: 'set', enum: Permission })
  permissions?: Permission[];

  @OneToMany(() => User, (user) => user.role, { lazy: true })
  users?: User[];
}
