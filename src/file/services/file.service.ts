import { BadRequestException, Injectable } from '@nestjs/common';
import { Picture } from '@app/file/entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PictureService } from '@app/file/services/picture/picture.service';
import { MimetypeEnum } from '@app/file/mimetype.enum';

@Injectable()
export class FileService {
  constructor(
    private readonly pictureService: PictureService,
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
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

  async findById(id: string): Promise<Picture> {
    return await this.pictureRepo.findOne(id);
  }

  async findAll(): Promise<Picture[]> {
    return await this.pictureRepo.find();
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
}
