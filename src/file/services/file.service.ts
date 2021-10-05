import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Picture } from '@app/file/entities/picture.entity';
import { EntityManager } from 'typeorm';
import { PictureService } from '@app/file/services/picture/picture.service';
import { MimetypeEnum } from '@app/file/mimetype.enum';
import { StoredFile } from '../entities/stored-file.entity';
import {
  PaginationOptions,
  PaginatorInterface,
} from '@app/shared/interfaces/paginator.interface';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { PictureDto } from '../dto/picture.dto';

@Injectable()
export class FileService implements PaginatorInterface<Picture> {
  constructor(
    private readonly pictureService: PictureService,
    private readonly manager: EntityManager,
  ) {}

  async getPage(
    index: number,
    limit: number,
    opts?: PaginationOptions,
  ): Promise<PaginationDto<Picture>> {
    return await this.pictureService.getPage(index, limit, opts);
  }

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

  async update(
    id: string | number,
    entity: PictureDto,
    mimetype: MimetypeEnum,
  ): Promise<void> {
    switch (mimetype) {
      case MimetypeEnum.IMAGE:
        const targetDto = {
          title: entity.title,
          caption: entity.caption,
        };
        await this.pictureService.update(id, targetDto);
        break;
      default:
        throw new BadRequestException('Unknown mimetype provided: ' + mimetype);
    }
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

  async delete(id: string, mimetype: MimetypeEnum): Promise<void> {
    switch (mimetype) {
      case MimetypeEnum.IMAGE:
        await this.pictureService.delete(id);
        break;
      default:
        throw new BadRequestException('Unknown mimetype provided: ' + mimetype);
    }
  }

  private async findAllMimes(crit = 'title'): Promise<StoredFile[]> {
    const storedFile = await this.manager
      .createQueryBuilder()
      .select()
      .from(Picture, 'picture')
      .orderBy(crit)
      .getMany();
    return storedFile;
  }
}
