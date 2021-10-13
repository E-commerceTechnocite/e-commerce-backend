import { Test, TestingModule } from '@nestjs/testing';
import { RecaptchaService } from './recaptcha.service';
import { mock } from 'jest-mock-extended';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('RecaptchaService', () => {
  let service: RecaptchaService;

  const httpMock = mock<HttpService>();
  const configMock = mock<ConfigService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecaptchaService,
        { provide: HttpService, useValue: httpMock },
        { provide: ConfigService, useValue: configMock },
      ],
    }).compile();

    service = module.get<RecaptchaService>(RecaptchaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
