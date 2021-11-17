import { Test, TestingModule } from '@nestjs/testing';
import { PictureService } from './picture.service';
import { mock } from 'jest-mock-extended';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PictureRepository } from '@app/file/repositories/picture/picture.repository';

describe('PictureService', () => {
  let service: PictureService;

  const pictureRepository = mock<PictureRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureService,
        {
          provide: getRepositoryToken(PictureRepository),
          useValue: pictureRepository,
        },
      ],
    }).compile();

    service = module.get<PictureService>(PictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
