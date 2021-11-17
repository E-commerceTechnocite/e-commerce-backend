import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { mock } from 'jest-mock-extended';
import { CountryService } from '@app/product/services/country/country.service';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';
import { Permission } from '@app/user/enums/permission.enum';
import { country } from '@app/test/stub';
import { createCountryDto } from '@app/test/stub/dto/country/create-country-dto';
import { updateCountryDto } from '@app/test/stub/dto/country/update-country-dto';

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

  it('should use the admin guard', function () {
    expect(CountryController).toHaveGuard(AdminJwtAuthGuard);
  });

  describe('getPage', () => {
    it('should require the read country permission', function () {
      expect(controller.find).toRequirePermissions(Permission.READ_COUNTRY);
    });
    describe('Query params', () => {
      it('should have a page query params', async () => {
        await controller.find(3);
        expect(countryService.getPage).toHaveBeenCalledWith(3, 10, {
          orderBy: null,
          order: null,
        });
      });

      it('should have a limit query params', async () => {
        await controller.find(3, 6);
        expect(countryService.getPage).toHaveBeenCalledWith(3, 6, {
          orderBy: null,
          order: null,
        });
      });

      it('should have a orderBy query params', async () => {
        await controller.find(3, 6, 'title');
        expect(countryService.getPage).toHaveBeenCalledWith(3, 6, {
          orderBy: 'title',
          order: null,
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
        order: null,
      });
    });
  });

  describe('findById', () => {
    it('should require the read country permission', function () {
      expect(controller.findById).toRequirePermissions(Permission.READ_COUNTRY);
    });
    it('should call the service', async () => {
      const c = country();
      countryService.find.mockResolvedValueOnce(c);

      const response = await controller.findById(c.id);

      expect(response).toEqual(c);
      expect(countryService.find).toHaveBeenCalledWith(c.id);
    });
  });

  describe('create', () => {
    it('should require the create permission', function () {
      expect(controller.create).toRequirePermissions(Permission.CREATE_COUNTRY);
    });
    it('should call the create method', async () => {
      const c = createCountryDto();
      const savedEntity = country();
      countryService.create.mockResolvedValueOnce(savedEntity);

      const response = await controller.create(c);

      expect(response).toEqual(savedEntity);
      expect(countryService.create).toHaveBeenCalledTimes(1);
      expect(countryService.create).toHaveBeenCalledWith(c);
    });
  });
  describe('update', () => {
    it('should require the update permission', function () {
      expect(controller.update).toRequirePermissions(Permission.UPDATE_COUNTRY);
    });
    it('should call the update method', async () => {
      const c = updateCountryDto();
      const entity = country();
      countryService.update.mockResolvedValueOnce(undefined);

      const response = await controller.update(entity.id, c);

      expect(response).toBeUndefined();
      expect(countryService.update).toHaveBeenCalledTimes(1);
      expect(countryService.update).toHaveBeenCalledWith(entity.id, c);
    });
  });
  describe('delete', () => {
    it('should require the delete permission', function () {
      expect(controller.delete).toRequirePermissions(Permission.DELETE_COUNTRY);
    });
    it('should call the delete method', async () => {
      const id = '1234';

      await controller.delete(id);

      expect(countryService.deleteWithId).toHaveBeenCalledWith(id);
    });
  });
});
