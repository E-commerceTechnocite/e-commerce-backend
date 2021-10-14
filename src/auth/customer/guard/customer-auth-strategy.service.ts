import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '@app/customer/entities/customer/customer.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'customer') {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload): Promise<Customer> {
    const customer = await this.customerRepo
      .createQueryBuilder('u')
      .where({ id: payload.id })
      .getOne();
    console.log(payload);
    return customer;
  }
}
