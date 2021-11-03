import { StoredFile } from '@app/file/entities/stored-file.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Picture extends StoredFile {
  // constructor(file: Express.Multer.File) {
  //   super();
  //   this.uri = '/public/' + file.filename;
  //   this.caption = file.filename;
  //   this.title = file.filename;
  // }

  @ApiProperty()
  @Column()
  caption?: string;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  height?: number;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  width?: number;

  @ManyToMany(() => Product, (product) => product.pictures, { lazy: true })
  products?: Product[];

  @OneToMany(() => Product, (product) => product.thumbnail, { lazy: true })
  productThumbnail?: Product;
}
