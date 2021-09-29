import { Test, TestingModule } from '@nestjs/testing';
import { OAuthController } from './o-auth.controller';
import { mock } from 'jest-mock-extended';
import { OAuthService } from '@app/auth/admin/o-auth/o-auth.service';

describe('OAuthController', () => {
  let controller: OAuthController;

  const oAuthService = mock<OAuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthController],
      providers: [{ provide: OAuthService, useValue: oAuthService }],
    }).compile();

    controller = module.get<OAuthController>(OAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
