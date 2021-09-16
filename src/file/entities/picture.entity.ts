import { StoredFile } from '@app/file/entities/stored-file.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Product } from '@app/product/entities/product.entity';

@Entity()
export class Picture extends StoredFile {
  // constructor(file: Express.Multer.File) {
  //   super();
  //   this.uri = '/public/' + file.filename;
  //   this.caption = file.filename;
  //   this.title = file.filename;
  // }

  @Column()
  caption?: string;

  @Column({ type: 'integer', nullable: true })
  height?: number;

  @Column({ type: 'integer', nullable: true })
  width?: number;

  @ManyToMany(() => Product, (product) => product.pictures, { lazy: true })
  products?: Product[];

  @OneToMany(() => Product, (product) => product.thumbnail, { lazy : true})
  productThumbnail ?: Product;
}
