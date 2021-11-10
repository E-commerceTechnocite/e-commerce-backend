import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { Picture } from '@app/file/entities/picture.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Picture)
export class PictureRepository extends GenericRepository<Picture> {}
