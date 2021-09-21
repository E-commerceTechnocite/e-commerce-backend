import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { mock } from 'jest-mock-extended';
import { FileService } from '@app/file/services/file.service';

describe('FileController', () => {
  let controller: FileController;

  const fileService = mock<FileService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [{ provide: FileService, useValue: fileService }],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
