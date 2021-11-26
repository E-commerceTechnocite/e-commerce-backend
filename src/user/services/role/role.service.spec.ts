import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, mockReset } from 'jest-mock-extended';
import { RoleService } from './role.service';
import { RoleRepository } from '@app/user/repositories/role/role.repository';
import { REQUEST } from '@nestjs/core';
import { createRoleDto } from '@app/test/stub/dto/role/create-role-dto';
import { ForbiddenException } from '@nestjs/common';
import { user } from '@app/test/stub/entities/user';
import { PermissionUtil } from '@app/user/enums/permission.enum';
import { role } from '@app/test/stub/entities/role';

describe('RoleService', () => {
  let service: RoleService;
  const roleRepository = mock<RoleRepository>();
  const request = mock<Request & Express.Request>();

  const defineUser = async () => {
    const u = await user();
    u.role.permissions = PermissionUtil.allPermissions();
    Object.defineProperty(request, 'user', {
      get: () => u,
      configurable: true,
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleRepository),
          useValue: roleRepository,
        },
        { provide: REQUEST, useValue: request },
      ],
    }).compile();
    await defineUser();
    service = module.get<RoleService>(RoleService);
    mockReset(roleRepository.findOneOrFail);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not be able to create a superadmin role', async () => {
      const r = createRoleDto();
      const u = await user();
      u.role.permissions = PermissionUtil.allPermissions();
      Object.defineProperty(request, 'user', {
        get: () => u,
        configurable: true,
      });
      r['superAdmin'] = true;

      const response = service.create(r);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should not be able to pass a superadmin role', async () => {
      const rDto = createRoleDto();
      const r = role();
      rDto['superAdmin'] = true;

      roleRepository.findOneOrFail.mockResolvedValueOnce(r);

      const response = service.update(r.id, rDto);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
    it('should not be able to modify a superadmin role', async () => {
      const rDto = createRoleDto();
      const r = role();
      r.superAdmin = true;
      roleRepository.findOneOrFail.mockResolvedValueOnce(r);

      const response = service.update(r.id, rDto);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
  });

  describe('delete', () => {
    it('should not be able to delete a superadmin role', async () => {
      const r = role();
      r.superAdmin = true;

      const response = service.delete(r);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
    it('should have a defined superAdmin property', async () => {
      const r = role();
      delete r.superAdmin;
      roleRepository.delete.mockResolvedValueOnce({ affected: 1, raw: {} });

      const response = service.delete(r);

      await expect(response).rejects.not.toThrow(ForbiddenException);
    });
  });

  describe('deleteFromId', () => {
    it('should not be able to delete a superadmin role', async () => {
      const r = role();
      r.superAdmin = true;
      roleRepository.findOneOrFail.mockResolvedValueOnce(r);

      const response = service.deleteFromId(r.id);

      await expect(response).rejects.toThrow(ForbiddenException);
      expect(roleRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: r.id },
      });
    });
  });
});
