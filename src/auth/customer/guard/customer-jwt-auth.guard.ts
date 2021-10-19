import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('customer') {
  constructor() {
    super();
  }

  handleRequest(err, customer, info, context: ExecutionContext) {
    // if (!customer) {
    //   throw new UnauthorizedException('Unauthenticated');
    // }
    console.log('customer guard');
    return customer;
  }
}
