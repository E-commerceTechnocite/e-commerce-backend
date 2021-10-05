import { Customer } from '@app/customer/entities/customer/customer.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { CustomerRefreshToken } from '../refresh-token.entity';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const customer = mock<Repository<Customer>>(); //rep
  const jwtService = mock<JwtService>();

  const request = mock<Request>();
  const configService = mock<ConfigService>();
  const customerRefreshToken = mock<Repository<CustomerRefreshToken>>(); //rep

  //providers: [{ provide: AuthService, useValue: authService }],

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: Request, useValue: request },
        { provide: ConfigService, useValue: configService },
        { provide: getRepositoryToken(Customer), useValue: customer },
        {
          provide: getRepositoryToken(CustomerRefreshToken),
          useValue: customerRefreshToken,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
