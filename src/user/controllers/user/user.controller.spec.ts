import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { mock } from 'jest-mock-extended';
import { UserService } from '@app/user/user.service';

describe('UserController', () => {
  let controller: UserController;

  const userService = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
