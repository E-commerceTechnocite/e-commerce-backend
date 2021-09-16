import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export abstract class EntitySchema {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true, onUpdate: 'NOW()' })
  updatedAt?: Date;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
