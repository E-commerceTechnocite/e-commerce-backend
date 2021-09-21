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
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';

@Injectable()
export class PictureService implements PaginatorInterface<Picture> {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Picture>> {
    const count = await this.pictureRepo.count();
    const meta = new PaginationMetadataDto(index, limit, count);
    if (meta.currentPage > meta.maxPages && meta.maxPages !== 0) {
      throw new NotFoundException('This page of pictures does not exist');
    }
    const query = this.pictureRepo.createQueryBuilder('p');
    if (opts) {
      const { orderBy } = opts;
      await query.orderBy(orderBy ?? 'id');
    }

    const data = await query
      .skip(index * limit - limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta,
    };
  }

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

  async findById(id: string | number): Promise<Picture> {
    const picture = await this.pictureRepo.findOne(id);
    if (!picture) {
      throw new NotFoundException();
    }
    return picture;
  }

  findAll(): Promise<Picture[]> {
    return this.pictureRepo.find();
  }
}
