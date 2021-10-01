import { CustomerRefreshToken } from '../refresh-token.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { CustomerLogDto } from '@app/customer/services/customer/customer-log.dto';

import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthResponseDto } from '../auth-response.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
interface TokenBody {
  id: string;
  username: string;
  email: string;
  //roleId: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly jwt: JwtService,
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly configService: ConfigService,

    @InjectRepository(CustomerRefreshToken)
    private readonly refreshTokenRepository: Repository<CustomerRefreshToken>,
  ) {}

  async login(customer: CustomerLogDto): Promise<AuthResponseDto> {
    let customerEntity;
    if (customer.username) {
      customerEntity = await this.customerRepo.findOne({
        where: { username: customer.username },
      });
    } else if (customer.email) {
      customerEntity = await this.customerRepo.findOne({
        where: { email: customer.email },
      });
    } else {
      throw new BadRequestException('Please provide a username or email');
    }
    if (
      !customerEntity ||
      !(await bcrypt.compare(customer.password, customerEntity.password))
    ) {
      throw new BadRequestException('Invalid Credentials');
    }
    const { id, username, email } = customerEntity;

    const refreshToken: CustomerRefreshToken = {
      //user: customerEntity,
      customer: customerEntity,
      userAgent: this.request.headers['user-agent'],
      value: this.jwt.sign(
        { id, username, email },
        {
          expiresIn: '30d',
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        },
      ),
    };

    console.log(refreshToken);
    await this.refreshTokenRepository.save(refreshToken);

    const tokenData: TokenBody = { id, username, email };
    return {
      access_token: this.jwt.sign(tokenData),

      refresh_token: refreshToken.value,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    const entity: CustomerRefreshToken =
      await this.refreshTokenRepository.findOne({
        value: refreshToken,
      });

    if (!entity || entity.userAgent !== this.request.headers['user-agent']) {
      throw new UnauthorizedException();
    }
    const decodedToken: TokenBody = this.jwt.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
    delete decodedToken.iat;
    delete decodedToken.exp;
    const tokenData: TokenBody = {
      ...decodedToken,
    };

    return {
      access_token: this.jwt.sign(tokenData),
      refresh_token: refreshToken,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const entity: CustomerRefreshToken =
      await this.refreshTokenRepository.findOne({
        value: refreshToken,
      });

    if (!entity || entity.userAgent !== this.request.headers['user-agent']) {
      throw new UnauthorizedException();
    }

    const decodedToken: TokenBody = this.jwt.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    const user = await this.customerRepo.findOne(decodedToken.id);

    await this.refreshTokenRepository.delete({
      userAgent: this.request.headers['user-agent'],
      customer: user,
    });
  }
}
