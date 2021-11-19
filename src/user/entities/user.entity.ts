import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '@app/user/entities/role.entity';
import { EntitySchema } from '@app/shared/entities/entity-schema';
import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from '@app/auth/admin/entities/refresh-token.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntitySchema implements Express.User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({ unique: true })
  username?: string;

  @ApiProperty()
  @Column({ unique: true })
  email?: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password?: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'id_role', referencedColumnName: 'id' })
  role?: Role;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens?: RefreshToken[];
}
