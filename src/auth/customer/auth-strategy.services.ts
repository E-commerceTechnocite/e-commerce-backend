import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '@app/customer/entities/customer/customer.entity';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
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
    let customer: Customer;

    // todo
    /*  const user = await this.userRepo
      .createQueryBuilder('u')
      .where({ id: payload.id })
      .leftJoinAndMapOne('u.role', Role, 'r', 'u.id_role = r.id')
      .getOne(); */
    return customer;
  }
}
