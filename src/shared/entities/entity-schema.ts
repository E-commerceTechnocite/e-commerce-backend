import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntitySchema {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'datetime' })
  createdAt?: Date;

  @Column({ type: 'datetime' })
  updatedAt?: Date;

  @Column({ type: 'datetime' })
  deletedAt?: Date;
}
