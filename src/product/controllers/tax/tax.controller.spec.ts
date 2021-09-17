import { Test, TestingModule } from '@nestjs/testing';
import { TaxController } from './tax.controller';
import { mock } from 'jest-mock-extended';
import { TaxService } from '@app/product/services/tax/tax.service';

describe('TaxController', () => {
  let controller: TaxController;

  const taxService = mock<TaxService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [{ provide: TaxService, useValue: taxService }],
    }).compile();

    controller = module.get<TaxController>(TaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
