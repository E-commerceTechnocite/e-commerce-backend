import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@app/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@app/user/entities/role.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .where({ id: payload.id })
      .leftJoinAndMapOne('u.role', Role, 'r', 'u.id_role = r.id')
      .getOne();
    return user;
  }
}
