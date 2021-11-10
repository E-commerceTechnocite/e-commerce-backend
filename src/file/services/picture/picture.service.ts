import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import * as fs from 'fs';
import { join } from 'path';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PictureDto } from '@app/file/dto/picture.dto';
import { PictureRepository } from '@app/file/repositories/picture/picture.repository';

@Injectable()
export class PictureService implements PaginatorInterface<Picture> {
  constructor(
    @InjectRepository(PictureRepository)
    private readonly pictureRepo: PictureRepository,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Picture>> {
    return await this.pictureRepo.findAndPaginate(index, limit, { ...opts });
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

  async update(id: string | number, entity: PictureDto): Promise<void> {
    const picture = await this.pictureRepo.findOne(id);
    if (!picture) {
      throw new BadRequestException(`Picture not found with id ${id}`);
    }
    delete picture.id;

    const target: Picture = {
      ...picture,
      title: entity.title,
      caption: entity.caption,
      updatedAt: new Date(Date.now()),
    };
    await this.pictureRepo.update(id, target);
  }

  async delete(id) {
    const file = await this.pictureRepo.findOne(id);
    if (!file) {
      throw new NotFoundException(`File with id "${id}" not found`);
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
    } finally {
      await this.pictureRepo.delete(file.id);
    }
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
