import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { RoleService } from './role.service';
import { RoleRepository } from '@app/user/repositories/role/role.repository';
import { REQUEST } from '@nestjs/core';

describe('RoleService', () => {
  let service: RoleService;
  const roleRepository = mock<RoleRepository>();
  const request = mock<Request & Express.Request>();

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

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
