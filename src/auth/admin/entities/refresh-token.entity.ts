import { EntitySchema } from '@app/shared/entities/entity-schema';
import { User } from '@app/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class RefreshToken extends EntitySchema {
  @Column({ type: 'text' })
  value?: string;

  @Column({ default: '' })
  userAgent?: string = '';

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;
}
