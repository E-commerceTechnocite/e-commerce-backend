import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/user/entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from '@app/mail/mail.service';
import { RandomizerService } from '@app/shared/services/randomizer.service';

describe('UserService', () => {
  let service: UserService;

  const userRepository = mock<Repository<User>>();
  const roleRepository = mock<Repository<Role>>();
  const mailService = mock<MailService>();
  const randomizerService = mock<RandomizerService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: userRepository },
        { provide: getRepositoryToken(Role), useValue: roleRepository },
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