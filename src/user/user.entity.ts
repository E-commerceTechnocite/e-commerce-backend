import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@app/auth/roles.decorator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  roles: Role[];
}
