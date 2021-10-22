import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export abstract class EntitySchema {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index({})
  id?: string;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt?: Date;

  @ApiProperty()
  @Column({
    type: 'datetime',
    nullable: true,
    onUpdate: 'NOW()',
    default: () => 'NOW()',
  })
  updatedAt?: Date;

  @ApiProperty()
  @Column({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}
