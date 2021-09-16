import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntitySchema {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'datetime' })
  createdAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
