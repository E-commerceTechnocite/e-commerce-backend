import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@app/product/controllers/product/product.controller';
import { ProductService } from '@app/product/services/product/product.service';
import { Product } from '@app/product/entities/product.entity';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { mock } from 'jest-mock-extended';
import { createProductDto, product, updateProductDto } from '@app/test/stub';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';
import { Permission } from '@app/user/enums/permission.enum';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';

describe('ProductController', () => {
  let controller: ProductController;

  const service = mock<ProductService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: service }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should use the admin guard', function () {
    expect(ProductController).toHaveGuard(AdminJwtAuthGuard);
  });

  describe('find', () => {
    it('should require read permission', () => {
      expect(controller.find).toRequirePermissions(Permission.READ_PRODUCT);
    });
    it('should return an pagination of products', async () => {
      // GIVEN
      const index = 1;
      const limit = 10;
      const count = 5;
      const meta = new PaginationMetadataDto(index, limit, count);
      const pagination: PaginationDto<Product> = {
        data: new Array(count).map((_) => product()),
        meta: meta,
      };
      service.getPage.calledWith(index, limit).mockResolvedValue(pagination);

      //WHEN
      const response = await controller.find(index, limit);

      // THEN
      expect(response).toEqual(pagination);
      expect(service.getPage).toHaveBeenCalledWith(index, limit, {
        order: null,
        orderBy: null,
      });
    });
  });

  describe('findById', () => {
    it('should require read permission', () => {
      expect(controller.findById).toRequirePermissions(Permission.READ_PRODUCT);
    });
    it('should return one product', async () => {
      // GIVEN
      const p = product();
      service.find.mockResolvedValue(p);

      // WHEN
      const response = await controller.findById(p.id);

      // THEN
      expect(response).toEqual(p);
      expect(service.find).toHaveBeenCalledWith(p.id);
    });
  });

  describe('create', () => {
    it('should require create permission', () => {
      expect(controller.create).toRequirePermissions(Permission.CREATE_PRODUCT);
    });
    it('should call the create method from the service', async () => {
      // GIVEN
      const p = createProductDto();

      // WHEN
      const response = await controller.create(p);

      // THEN
      expect(service.create).toHaveBeenCalledWith(p);
    });
  });

  describe('update', () => {
    it('should require update permission', () => {
      expect(controller.update).toRequirePermissions(Permission.UPDATE_PRODUCT);
    });
    it('should call the update method from the service', async () => {
      // GIVEN
      const id = '1234';
      const p = updateProductDto();

      // WHEN
      const response = await controller.update(id, p);

      // THEN
      expect(service.update).toHaveBeenCalledWith(id, p);
    });
  });

  describe('delete', () => {
    it('should require delete permission', () => {
      expect(controller.delete).toRequirePermissions(Permission.DELETE_PRODUCT);
    });
    it('should call the delete method from the service', async () => {
      // GIVEN
      const id = '1234';

      // WHEN
      const response = await controller.delete(id);

      // THEN
      expect(service.deleteFromId).toHaveBeenCalledWith(id);
    });
  });
});
