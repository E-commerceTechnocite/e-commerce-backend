import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
  ) {}

  async add(...pictures: Express.Multer.File[]): Promise<Picture[]> {
    const pics: Picture[] = [];
    pictures.forEach((picture) => {
      pics.push({
        title: picture.filename,
        caption: picture.filename,
        uri: '/public/files/' + picture.filename,
        createdAt: new Date(Date.now()),
      });
    });
    return await this.pictureRepo.save(pics);
  }

  async delete(id, path) {
    await this.pictureRepo.delete(id);

    await fs.unlink(path, async (err) => {
      if (err) {
        throw new BadRequestException();
      }
      await this.pictureRepo.delete(id);
    });
  }
}
