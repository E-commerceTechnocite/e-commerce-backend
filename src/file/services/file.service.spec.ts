import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { mock } from 'jest-mock-extended';
import { PictureService } from '@app/file/services/picture/picture.service';
import { Repository } from 'typeorm';
import { Picture } from '@app/file/entities/picture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FileService', () => {
  let service: FileService;

  const pictureService = mock<PictureService>();
  const pictureRepository = mock<Repository<Picture>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        { provide: getRepositoryToken(Picture), useValue: pictureRepository },
        { provide: PictureService, useValue: pictureService },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
