import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { OAuthResponseDto } from '@app/auth/o-auth-response.dto';
import { UserLogDto } from '@app/user/user-log.dto';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwt: JwtService,
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
    return {
      access_token: this.jwt.sign({ id, username, email, roleId }),
    };
  }
}
