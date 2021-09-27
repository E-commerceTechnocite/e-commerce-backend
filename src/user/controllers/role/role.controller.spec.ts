import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { mock } from 'jest-mock-extended';
import { RoleService } from '@app/user/services/role/role.service';

describe('RoleController', () => {
  let controller: RoleController;

  const roleService = mock<RoleService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [{ provide: RoleService, useValue: roleService }],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
