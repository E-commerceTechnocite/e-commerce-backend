import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CUSTOMER_AUTHENTICATED_KEY } from '@app/auth/customer/guard/customer-authenticated.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('customer') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, customer, info, context: ExecutionContext) {
    console.log('CUSTOMER_GUARD');
    const requiresAuth = this.reflector.getAllAndOverride(
      CUSTOMER_AUTHENTICATED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiresAuth && !customer) {
      throw new UnauthorizedException('Unauthenticated');
    }
    return customer;
  }
}
