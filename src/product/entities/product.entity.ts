import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true })
  @Column()
  title: string;

  @ApiProperty({ required: true })
  @Column()
  reference: string;

  @ApiProperty({ required: true })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ required: true })
  @Column({ type: 'float' })
  price: number;
}
