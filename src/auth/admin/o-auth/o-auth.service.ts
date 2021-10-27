import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { OAuthResponseDto } from '@app/auth/admin/dto/o-auth-response.dto';
import { UserLogDto } from '@app/user/user-log.dto';
import { RefreshToken } from '../entities/refresh-token.entity';

import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core/router/request/request-constants';

interface TokenBody {
  id: string;
  username: string;
  email: string;
  roleId: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwt: JwtService,
    @Inject(REQUEST)
    private readonly request: Express.Request & Request,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly configService: ConfigService,
  ) {}

  async login(user: UserLogDto): Promise<OAuthResponseDto> {
    let userEntity;
    if (user.username) {
      userEntity = await this.userRepo.findOne({
        where: { username: user.username },
      });
    } else if (user.email) {
      userEntity = await this.userRepo.findOne({
        where: { email: user.email },
      });
    } else {
      throw new BadRequestException('Please provide a username or email');
    }
    if (
      !userEntity ||
      !(await bcrypt.compare(user.password, userEntity.password))
    ) {
      throw new BadRequestException('Invalid Credentials');
    }
    const { id, username, email, role } = userEntity;
    const roleId = role.id;
    const refreshToken: RefreshToken = {
      user: userEntity,
      userAgent: this.request.headers['user-agent'],
      value: this.jwt.sign(
        { id, username, email, roleId },
        {
          expiresIn: '30d',
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        },
      ),
    };

    await this.refreshTokenRepository.save(refreshToken);

    const tokenData: TokenBody = { id, username, email, roleId };
    return {
      access_token: this.jwt.sign(tokenData),
      refresh_token: refreshToken.value,
    };
  }

  async refreshToken(refreshToken: string): Promise<OAuthResponseDto> {
    const entity: RefreshToken = await this.refreshTokenRepository.findOne({
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
    const entity: RefreshToken = await this.refreshTokenRepository.findOne({
      value: refreshToken,
    });

    if (!entity || entity.userAgent !== this.request.headers['user-agent']) {
      throw new UnauthorizedException();
    }

    const decodedToken: TokenBody = this.jwt.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    const user = await this.userRepo.findOne(decodedToken.id);

    await this.refreshTokenRepository.delete({
      userAgent: this.request.headers['user-agent'],
      user: user,
    });
  }

  async check() {
    const token = this.request.headers.authorization?.split(' ')[1];
    try {
      return this.jwt.verify<any>(token);
    } catch (err) {
      throw new UnauthorizedException('Unauthenticated');
    }
  }

  async getPermissions() {
    const user = await this.check();
    const { role } = await this.userRepo.findOne({ id: user.id });
    return role.permissions;
  }
}
