import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from '@app/product/controllers/product-category/product-category.controller';
import { ProductCategoryService } from '@app/product/services/product-category/product-category.service';
import { mock } from 'jest-mock-extended';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';
import { createProductCategoryDto, product } from '@app/test/stub';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { Permission } from '@app/user/enums/permission.enum';
import { id } from '@app/test/util/id';
import { updateProductCategoryDto } from '@app/test/stub/dto/product-category/update-product-category-dto';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;
  const service = mock<ProductCategoryService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [{ provide: ProductCategoryService, useValue: service }],
    }).compile();

    controller = module.get<ProductCategoryController>(
      ProductCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should use the admin guard', function () {
    expect(ProductCategoryController).toHaveGuard(AdminJwtAuthGuard);
  });

  describe('find', () => {
    it('should require the read permission', function () {
      expect(controller.find).toRequirePermissions(Permission.READ_CATEGORY);
    });
    it('should call the getPage method', async () => {
      const products = [product(), product()];
      const page = 1;
      const limit = 10;
      const count = products.length;
      const meta = new PaginationMetadataDto(page, limit, count);
      const pagination = { data: products, meta };
      service.getPage.mockResolvedValueOnce(pagination);

      const response = await controller.find(page, limit);

      expect(response).toEqual(pagination);
      expect(service.getPage).toHaveBeenCalledWith(page, limit, {
        order: null,
        orderBy: null,
      });
      expect(service.getPage).toHaveBeenCalledTimes(1);
    });
  });
  describe('findById', () => {
    it('should require the read permission', function () {
      expect(controller.findById).toRequirePermissions(
        Permission.READ_CATEGORY,
      );
    });

    it('should call the find method', async () => {
      const p = product();
      service.find.mockResolvedValueOnce(p);

      const response = await controller.findById(p.id);

      expect(response).toEqual(p);
      expect(service.find).toHaveBeenCalledWith(p.id);
      expect(service.find).toHaveBeenCalledTimes(1);
    });
  });
  describe('create', () => {
    it('should require the create permission', function () {
      expect(controller.create).toRequirePermissions(
        Permission.CREATE_CATEGORY,
      );
    });
    it('should call the create method', async () => {
      const p = createProductCategoryDto();
      const savedEntity = product();
      service.create.mockResolvedValueOnce(savedEntity);

      const response = await controller.create(p);

      expect(response).toEqual(savedEntity);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(p);
    });
  });
  describe('update', () => {
    it('should require the update permission', function () {
      expect(controller.update).toRequirePermissions(
        Permission.UPDATE_CATEGORY,
      );
    });
    it('should call the update method', async () => {
      const pId = id();
      const p = updateProductCategoryDto();

      const response = await controller.update(pId, p);

      expect(response).toBeUndefined();
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(pId, p);
    });
  });
  describe('delete', () => {
    it('should require the delete permission', function () {
      expect(controller.delete).toRequirePermissions(
        Permission.DELETE_CATEGORY,
      );
    });
    it('should call the delete method', async () => {
      const id = '1324';

      const response = await controller.delete(id);

      expect(response).toBeUndefined();
      expect(service.deleteWithId).toHaveBeenCalledWith(id);
      expect(service.deleteWithId).toHaveBeenCalledTimes(1);
    });
  });
});
