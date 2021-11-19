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
});
