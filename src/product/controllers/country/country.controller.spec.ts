import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { mock } from 'jest-mock-extended';
import { CountryService } from '@app/product/services/country/country.service';

describe('CountryController', () => {
  let controller: CountryController;

  const countryService = mock<CountryService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{ provide: CountryService, useValue: countryService }],
    }).compile();

    controller = module.get<CountryController>(CountryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPage', () => {
    describe('Query params', () => {
      it('should have a page query params', async () => {
        await controller.find(3);
        expect(countryService.getPage).toHaveBeenCalledWith(3, 10, {
          orderBy: null,
          order: 'DESC',
        });
      });

      it('should have a limit query params', async () => {
        await controller.find(3, 6);
        expect(countryService.getPage).toHaveBeenCalledWith(3, 6, {
          orderBy: null,
          order: 'DESC',
        });
      });

      it('should have a orderBy query params', async () => {
        await controller.find(3, 6, 'title');
        expect(countryService.getPage).toHaveBeenCalledWith(3, 6, {
          orderBy: 'title',
          order: 'DESC',
        });
      });
      it('should have a order query params', async () => {
        await controller.find(3, 6, 'title', 'ASC');
        expect(countryService.getPage).toHaveBeenCalledWith(3, 6, {
          orderBy: 'title',
          order: 'ASC',
        });
      });
    });

    it('should have default parameters for query params', async () => {
      await controller.find();
      expect(countryService.getPage).toHaveBeenCalledWith(1, 10, {
        orderBy: null,
        order: 'DESC',
      });
    });
  });

  describe('findById', () => {
    it('should call the service', async () => {
      await controller.findById('1234');
      expect(countryService.find).toHaveBeenCalledWith('1234');
    });
  });
});
