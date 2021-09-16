import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';

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

  async delete(title) {
    const file = await this.pictureRepo.findOne({ title });
    if (!file) {
      throw new NotFoundException(`File with title "${title}" not found`);
    }
    const path = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      ...file.uri.replace('/', '').trim().split('/'),
    );

    console.log(path);

    try {
      fs.unlinkSync(path);
    } catch (err) {
      if (err) {
        throw new BadRequestException('Could no remove from file system');
      }
    }
    await this.pictureRepo.delete(file.id);
  }

  async handleFileDeletion(err, file) {
    console.log(err.message, file);
  }
}
