import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  reference: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'float' })
  price: number;
}
