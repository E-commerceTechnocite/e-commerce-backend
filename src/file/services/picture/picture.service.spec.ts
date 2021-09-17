import { Test, TestingModule } from '@nestjs/testing';
import { PictureService } from './picture.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PictureService', () => {
  let service: PictureService;

  const pictureRepository = mock<Repository<Picture>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureService,
        { provide: getRepositoryToken(Picture), useValue: pictureRepository },
      ],
    }).compile();

    service = module.get<PictureService>(PictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
