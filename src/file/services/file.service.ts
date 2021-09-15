import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Picture } from '@app/file/entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import { PictureService } from '@app/file/services/picture/picture.service';
import { MimetypeEnum } from '@app/file/mimetype.enum';

@Injectable()
export class FileService {
  constructor(
    private readonly pictureService: PictureService,
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
  ) {}

  private getFromMimeType(
    files: Express.Multer.File[],
    mimetype: MimetypeEnum,
  ) {
    return files.filter((file) => file.mimetype.split('/')[0] === mimetype);
  }

  async add(...files: Express.Multer.File[]) {
    const pictures = this.getFromMimeType(files, MimetypeEnum.IMAGE);
    const documents = this.getFromMimeType(files, MimetypeEnum.APPLICATION);
    const video = this.getFromMimeType(files, MimetypeEnum.VIDEO);

    console.log(pictures);
    await this.pictureService.add(...pictures);
  }

  async findById(id: string): Promise<Picture> {
    return await this.pictureRepo.findOne(id);
  }

  async findAll(): Promise<Picture[]> {
    return await this.pictureRepo.find();
  }

  async delete(title: string, mimetype: MimetypeEnum): Promise<void> {
    const file = await this.pictureRepo.findOne({ title });
    if (!file) {
      throw new NotFoundException(`File with title "${title}" not found`);
    }
    const filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      ...file.uri.replace('/', '').trim().split('/'),
    );
    switch (mimetype) {
      case MimetypeEnum.IMAGE:
        await this.pictureService.delete(title, filePath);
        break;
      case MimetypeEnum.APPLICATION:
        throw new InternalServerErrorException('Not implemented');
      case MimetypeEnum.VIDEO:
        throw new InternalServerErrorException('Not implemented');
      default:
        throw new BadRequestException('Unknown mimetype provided: ' + mimetype);
    }
    console.log(filePath);
  }
}
