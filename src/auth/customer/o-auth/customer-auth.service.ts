import { CustomerRefreshToken } from '../entities/refresh-token.entity';
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
import { OAuthResponseDto } from '@app/auth/dto/o-auth-response.dto';
import * as bcrypt from 'bcrypt';
import { Request } from '@nestjs/common';
import { CustomerTokenDataDto } from '@app/auth/customer/dto/customer-token-data.dto';

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

  async login(customer: CustomerLogDto): Promise<OAuthResponseDto> {
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
          secret: this.configService.get('CUSTOMER_JWT_REFRESH_TOKEN_SECRET'),
        },
      ),
    };

    console.log(refreshToken);
    await this.refreshTokenRepository.save(refreshToken);

    const tokenData: CustomerTokenDataDto = { id, username, email };

    return {
      access_token: this.jwt.sign(tokenData),

      refresh_token: refreshToken.value,
    };
  }

  async refreshToken(refreshToken: string): Promise<OAuthResponseDto> {
    const entity: CustomerRefreshToken =
      await this.refreshTokenRepository.findOne({
        value: refreshToken,
      });

    if (!entity || entity.userAgent !== this.request.headers['user-agent']) {
      throw new UnauthorizedException();
    }
    const decodedToken: CustomerTokenDataDto = this.jwt.verify(refreshToken, {
      secret: this.configService.get('CUSTOMER_JWT_REFRESH_TOKEN_SECRET'),
    });
    delete decodedToken.iat;
    delete decodedToken.exp;
    const tokenData: CustomerTokenDataDto = {
      ...decodedToken,
    };
    //delete decodedToken.iat;

    return {
      access_token: this.jwt.sign(tokenData),
      refresh_token: refreshToken,
    };
  }

  //-------------------------------
  async logout(refreshToken: string): Promise<void> {
    const entity: CustomerRefreshToken =
      await this.refreshTokenRepository.findOne({
        value: refreshToken,
      });

    if (!entity || entity.userAgent !== this.request.headers['user-agent']) {
      throw new UnauthorizedException();
    }

    const decodedToken: CustomerTokenDataDto = this.jwt.verify(refreshToken, {
      secret: this.configService.get('CUSTOMER_JWT_REFRESH_TOKEN_SECRET'),
    });

    const user = await this.customerRepo.findOne(decodedToken.id);

    await this.refreshTokenRepository.delete({
      userAgent: this.request.headers['user-agent'],
      customer: user,
    });
  }

  // create method check

  async check(req: Request): Promise<void> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
      this.jwt.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
