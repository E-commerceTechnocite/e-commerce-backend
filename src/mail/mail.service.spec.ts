import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';
import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;
  let mailerService = mock<MailerService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mailerService },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
