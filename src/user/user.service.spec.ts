import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/user/entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailModule } from '@app/mail/mail.module';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';

describe('UserService', () => {
  let service: UserService;

  const userRepository = mock<Repository<User>>();
  const roleRepository = mock<Repository<Role>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule, ApplicationConfigurationModule],
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: userRepository },
        { provide: getRepositoryToken(Role), useValue: roleRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
