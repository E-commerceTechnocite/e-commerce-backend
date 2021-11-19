import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mock, mockFn } from 'jest-mock-extended';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from '@app/mail/mail.service';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { UserRepository } from '@app/user/repositories/user/user.repository';
import { REQUEST } from '@nestjs/core';
import { RoleService } from '@app/user/services/role/role.service';
import { createUserDto } from '@app/test/stub/dto/user/create-user-dto';
import { role } from '@app/test/stub/entities/role';
import { SelectQueryBuilder } from 'typeorm';
import { Role } from '@app/user/entities/role.entity';
import { ForbiddenException } from '@nestjs/common';
import { user } from '@app/test/stub/entities/user';
import { updateUserDto } from '@app/test/stub/dto/user/update-user-dto';
import { uuid } from '@app/test/util/id';

describe('UserService', () => {
  let service: UserService;

  const userRepository = mock<UserRepository>();
  const roleService = mock<RoleService>();
  const mailService = mock<MailService>();
  const randomizerService = mock<RandomizerService>();
  const request = mock<Request & Express.Request>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: userRepository,
        },
        {
          provide: RoleService,
          useValue: roleService,
        },
        { provide: MailService, useValue: mailService },
        { provide: RandomizerService, useValue: randomizerService },
        { provide: REQUEST, useValue: request },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw when creating superadmin user', async () => {
      const u = createUserDto();
      const r = role();
      r.superAdmin = true;
      const qb = mock<SelectQueryBuilder<Role>>({
        where: mockFn().mockReturnThis(),
        orWhere: mockFn().mockReturnThis(),
        getCount: mockFn().mockResolvedValueOnce(0),
      });
      userRepository.createQueryBuilder.mockReturnValueOnce(qb);
      roleService.find.mockResolvedValueOnce(r);

      const response = service.create(u);

      await expect(response).rejects.toThrow(ForbiddenException);
      expect(roleService.find).toHaveBeenCalledWith(r.id);
    });
  });

  describe('update', () => {
    it('should throw when updating superadmin', async () => {
      const uDto = updateUserDto();
      const u = await user();
      uDto.roleId = undefined;
      u.role.superAdmin = true;
      userRepository.findOneOrFail.mockResolvedValueOnce(u);

      const response = service.update(u.id, uDto);

      await expect(response).rejects.toThrow(ForbiddenException);
    });

    it('should throw when adding superadmin role to random people', async () => {
      const uDto = updateUserDto();
      const u = await user();
      const r = role();
      r.superAdmin = true;
      roleService.find.mockResolvedValueOnce(r);
      userRepository.findOneOrFail.mockResolvedValueOnce(u);

      const response = service.update(u.id, uDto);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
  });

  describe('delete', () => {
    it('should throw when trying to delete a superadmin', async () => {
      const u = await user();
      u.role.superAdmin = true;

      const response = service.delete(u);

      await expect(response).rejects.toThrow(ForbiddenException);
    });

    it('should have a defined role', async () => {
      const u = await user();
      delete u.role;

      const response = service.delete(u);

      await expect(response).rejects.toThrow(ForbiddenException);
    });

    it('should have a defined role.superAdmin property', async () => {
      const u = await user();
      delete u.role.superAdmin;

      const response = service.delete(u);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteFromId', () => {
    it('should throw when trying to delete a superadmin', async () => {
      const u = await user();
      const id = uuid();
      u.id = id;
      u.role.superAdmin = true;
      userRepository.findOneOrFail.mockResolvedValueOnce(u);

      const response = service.deleteFromId(id);

      await expect(response).rejects.toThrow(ForbiddenException);
    });
  });
});
