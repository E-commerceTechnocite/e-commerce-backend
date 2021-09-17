import { BadRequestException, Injectable } from '@nestjs/common';
import { Picture } from '@app/file/entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getManager, Repository } from 'typeorm';
import { PictureService } from '@app/file/services/picture/picture.service';
import { MimetypeEnum } from '@app/file/mimetype.enum';
import { StoredFile } from '../entities/stored-file.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly pictureService: PictureService,
    private readonly manager: EntityManager,
  ) {}

  /**
   * Filter files based on their mimetype
   * @param files
   * @param mimetype
   * @private
   */
  private filterMimetype(files: Express.Multer.File[], mimetype: MimetypeEnum) {
    return files.filter((file) => file.mimetype?.split('/')[0] === mimetype);
  }

  async add(...files: Express.Multer.File[]) {
    const pictures = this.filterMimetype(files, MimetypeEnum.IMAGE);

    await this.pictureService.add(...pictures);
  }

  async findById(id: string, mimetype: MimetypeEnum): Promise<any> {
    switch (mimetype) {
      case MimetypeEnum.IMAGE:
        return await this.pictureService.findById(id);
      default:
        throw new BadRequestException('Unknown mimetype provided: ' + mimetype);
    }
  }

  async findAll(mimetype: MimetypeEnum): Promise<Picture[]> {
    switch (mimetype) {
      case MimetypeEnum.IMAGE:
        return await this.pictureService.findAll();
      default:
        throw new BadRequestException('Unknown mimetype provided: ' + mimetype);
    }
  }

  async delete(title: string, mimetype: MimetypeEnum): Promise<void> {
    switch (mimetype) {
      case MimetypeEnum.IMAGE:
        await this.pictureService.delete(title);
        break;
      default:
        throw new BadRequestException('Unknown mimetype provided: ' + mimetype);
    }
  }

  private async findAllMimes(crit: string = 'title'): Promise<StoredFile[]> {
    const storedFile = await this.manager
      .createQueryBuilder()
      .select()
      .from(Picture, 'picture')
      .orderBy(crit)
      .getMany();
    return storedFile;
  }
}
