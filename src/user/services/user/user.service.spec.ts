import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mock } from 'jest-mock-extended';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from '@app/mail/mail.service';
import { RandomizerService } from '@app/shared/services/randomizer.service';
import { UserRepository } from '@app/user/repositories/user/user.repository';
import { RoleRepository } from '@app/user/repositories/role/role.repository';

describe('UserService', () => {
  let service: UserService;

  const userRepository = mock<UserRepository>();
  const roleRepository = mock<RoleRepository>();
  const mailService = mock<MailService>();
  const randomizerService = mock<RandomizerService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: userRepository,
        },
        {
          provide: getRepositoryToken(RoleRepository),
          useValue: roleRepository,
        },
        { provide: MailService, useValue: mailService },
        { provide: RandomizerService, useValue: randomizerService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
