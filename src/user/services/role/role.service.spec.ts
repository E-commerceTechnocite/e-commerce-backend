import { Role } from '@app/user/entities/role.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Role } from '@app/user/entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoleService', () => {
  let service: RoleService;
  const roleRepository = mock<Repository<Role>>();

  const roleRepo = mock<Repository<Role>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
