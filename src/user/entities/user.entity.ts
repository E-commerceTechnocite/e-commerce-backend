import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '@app/user/entities/role.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';

@Entity()
export class User extends EntitySchema {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  username?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'id_role', referencedColumnName: 'id' })
  role?: Role;
}
